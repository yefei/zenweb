'use strict';

const debug = require('debug')('zenweb:core');
const assert = require('assert');
const Koa = require('koa');
const Router = require('@koa/router');
const path = require('path');
const { discover } = require('./utils');
const log = require('./log');
const { setup: api } = require('./api');
const meta = require('./meta');
const helper = require('./helper');
const { setup: service } = require('./service');
const { setup: bodyParser } = require('./body_parser');

const KOA = Symbol('zenweb#app');
const ROUTER = Symbol('zenweb#router');
const LOADED = Symbol('zenweb#loaded');
const OPTIONS = Symbol('zenweb#options');
const START_TIME = Symbol('zenweb#startTime');

class Core {
  /**
   * @param {object} [options] 配置项
   * @param {object} [options.api] API配置
   * @param {number} [options.api.failCode=undefined] 默认失败代码
   * @param {number} [options.api.failHttpCode=422] 默认失败HTTP状态码
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
    Object.defineProperty(this.koa.context, 'core', { value: this });
    this.koa.use(meta);
    this.setup(log, undefined, 'log');
    this.setup(api, this[OPTIONS].api, 'api');
    this.setup(helper, undefined, 'helper');
    this.setup(service, undefined, 'service');
    this.setup(bodyParser, this[OPTIONS].bodyParser, 'bodyParser');
  }

  /**
   * 在 KOA.Context 中定义属性并缓存，当第一次调用属性时执行 get 方法，之后不再调用 get
   * @param {string|number|symbol} prop 属性名称
   * @param {function(Koa.Context)} get 第一次访问时回调
   */
  defineContextCacheProperty(prop, get) {
    const CACHE = Symbol('zenweb#contextCacheProperty');
    Object.defineProperty(this.koa.context, prop, {
      get() {
        if (this[CACHE] === undefined) {
          this[CACHE] = get(this) || null;
        }
        return this[CACHE];
      }
    });
  }

  /**
   * 检查模块是否已经安装，没有安装抛出异常
   * @param {string} mod 模块名
   * @throws {Error}
   * @returns {Core}
   */
  check(mod) {
    assert(this[LOADED].findIndex(i => i[0] === mod) > -1, `module [${mod}] must be setup`);
    return this;
  }

  /**
   * 安装模块
   * @param {string|((core: Core, options: *) => void)} mod 模块名称或模块引用
   * @param {*} [options] 模块配置项
   * @param {string} [name] 模块名称
   * @returns {Core}
   */
  setup(mod, options, name) {
    if (typeof mod === 'string') {
      name = name || mod;
      try {
        mod = require(mod);
      } catch (err) {
        console.error('load module [%s] error: %s', name, err);
        process.exit(1);
      }
      if (typeof mod === 'object') {
        mod = mod.setup;
        if (typeof mod !== 'function') {
          console.error('module [%s] miss setup function', name);
          process.exit(1);
        }
      }
    } else {
      name = name || mod.name;
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
    discover(path.join(process.cwd(), 'app'));
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
