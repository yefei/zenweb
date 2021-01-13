'use strict';

const debug = require('debug')('jiango:core');
const assert = require('assert');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const { discover } = require('./utils');
const log = require('./log');
const fail = require('./fail');

const KOA = Symbol('jiango#app');
const ROUTER = Symbol('jiango#router');
const LOADED = Symbol('jiango#loaded');
const OPTIONS = Symbol('jiango#options');
const START_TIME = Symbol('jiango#startTime');

class Core {
  /**
   * @param {object} [options] 配置项
   * @param {object} [options.fail] 业务失败时配置项
   * @param {number} [options.fail.defaultCode=undefined] 默认失败代码
   * @param {number} [options.fail.defaultHttpCode=422] 默认失败HTTP状态码
   */
  constructor(options) {
    this[START_TIME] = Date.now();
    this[KOA] = new Koa();
    this[ROUTER] = new Router();
    this[LOADED] = [];
    this[OPTIONS] = options || {};
    this._init();
  }

  /**
   * 取得KOA实例
   * @returns {Koa}
   */
  get koa() {
    return this[KOA];
  }

  /**
   * 取得根路由
   * @returns {Router}
   */
  get router() {
    return this[ROUTER];
  }

  /**
   * 取得已载入模块列表
   * @returns {string[]}
   */
  get loaded() {
    return this[LOADED];
  }

  /**
   * 初始化
   * @private
   */
  _init() {
    log(this);
    fail(this, this[OPTIONS].fail);
    this.koa.use(bodyParser());
  }

  /**
   * 检查模块是否已经安装，没有安装抛出异常
   * @param {string} mod 模块名
   * @throws {Error}
   */
  check(mod) {
    assert(this[LOADED].findIndex(i => i[0] === mod) > -1, `module [${mod}] must be setup`);
  }

  /**
   * 安装模块
   * @param {string|object} mod 模块名称或模块引用
   * @param {*} [options] 模块配置项
   * @returns {Core}
   */
  setup(mod, options) {
    let name;
    if (typeof mod === 'string') {
      name = mod;
      try {
        mod = require(mod);
      } catch (err) {
        console.error('load module [%s] error: %s', name, err);
        process.exit(1);
      }
    } else {
      name = mod.name;
    }
    this[LOADED].push([name, mod, options]);
    return this;
  }

  /**
   * 初始化模块列表
   * @private
   */
  async _setupInit() {
    for (const [name, mod, options] of this[LOADED]) {
      try {
        await mod(this, options);
      } catch (err) {
        throw new Error(`setup module [${name}] error: ${err}`);
      }
      debug('setup module [%s] success', name);
    }
  }

  /**
   * 启动所有模块代码
   */
  async boot() {
    const directory = path.join(process.cwd(), 'app');
    if (fs.existsSync(directory)) {
      discover(directory);
    }
    await this._setupInit();
    this.koa.use(this.router.routes());
    this.koa.use(this.router.allowedMethods());
  }

  /**
   * 监听端口
   * @param {number} [port=7001] 
   */
  listen(port) {
    port = port || Number(process.env.PORT) || 7001;
    this.koa.listen(port, () => {
      console.log(`server on: %s.`, port);
    });
  }

  /**
   * 启动应用并监听端口
   * @param {number} [port] 监听端口
   */
  start(port) {
    this.boot().then(() => {
      console.info('boot time: %o ms', Date.now() - this[START_TIME]);
      this.listen(port);
    }, err => {
      console.error(err);
      process.exit(1);
    });
  }
}

module.exports = Core;
