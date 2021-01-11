'use strict';

const debug = require('debug')('jiango:core');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const discover = require('./discover');
const log = require('./log');
const fail = require('./fail');
const assert = require('assert');

const KOA = Symbol('jiango#app');
const ROUTER = Symbol('jiango#router');
const LOADED = Symbol('jiango#loaded');
const OPTIONS = Symbol('jiango#options');

class Core {
  /**
   * @param {object} [options] 配置项
   * @param {object} [options.fail] 业务失败时配置项
   * @param {number} [options.fail.defaultCode=undefined] 默认失败代码
   * @param {number} [options.fail.defaultHttpCode=422] 默认失败HTTP状态码
   */
  constructor(options) {
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
    this.setup(log, this[OPTIONS].log);
    this.setup(fail, this[OPTIONS].fail);
    this.koa.use(bodyParser());
  }

  /**
   * 检查模块是否已经安装，没有安装抛出异常
   * @param {string} mod 模块名
   * @throws {Error}
   */
  check(mod) {
    assert(this[LOADED].includes(mod), `module [${mod}] must be setup`);
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

    try {
      mod(this, options);
    } catch (err) {
      console.error('setup module [%s] error: %s', name, err);
      process.exit(1);
    }

    debug('setup module [%s] success', name);
    this[LOADED].push(name);
    return this;
  }

  /**
   * 启动应用并监听端口
   * @param {number} [port] 监听端口
   */
  start(port) {
    const startTime = Date.now();
    const directory = path.join(process.cwd(), 'app');
    if (fs.existsSync(directory)) {
      discover(directory);
    }
    // 打印出已经加载的路由
    // this.router.stack.forEach(i => console.log('Router: [%s] %s', i.methods.join(','), i.path));
    this.koa.use(this.router.routes());
    this.koa.use(this.router.allowedMethods());
    port = port || Number(process.env.PORT) || 7001;
    this.koa.listen(port, () => {
      console.log(`Server: %s. %o ms`, port, Date.now() - startTime);
    });
  }
}

module.exports = Core;
