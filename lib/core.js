'use strict';

const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const setupLog = require('./log');
const load = require('./load');
const setupFail = require('./fail');

const KOA = Symbol('jiango#app');
const ROUTER = Symbol('jiango#router');

class App {
  constructor(options) {
    this[KOA] = new Koa();
    this[ROUTER] = new Router();
    this.setup(setupLog);
    this.setup(setupFail, options);
    this.use(bodyParser());
  }

  /**
   * @returns {Koa}
   */
  get koa() {
    return this[KOA];
  }

  /**
   * @returns {Router}
   */
  get router() {
    return this[ROUTER];
  }

  /**
   * @param {Koa.Middleware} middleware 
   * @returns {App}
   */
  use(middleware) {
    this[KOA].use(middleware);
    return this;
  }

  /**
   * 安装模块
   * @param {string | object} module 模块名或模块函数引用
   * @param {*} [options] 模块配置项
   */
  setup(module, options) {
    if (typeof module === 'string') {
      module = require(module);
    }
    module(this, options);
    return this;
  }

  /**
   * 启动服务
   * @param {number} [port] 监听端口
   */
  start(port) {
    const startTime = Date.now();
    const directory = path.join(process.cwd(), 'app');
    if (fs.existsSync(directory)) {
      load(directory);
    }
    // 打印出已经加载的路由
    this.router.stack.forEach(i => console.log('Router: [%s] %s', i.methods.join(','), i.path));
    this.use(this.router.routes());
    this.use(this.router.allowedMethods());
    port = port || Number(process.env.PORT) || 7001;
    this[KOA].listen(port, () => {
      console.log(`Server: %s. %o ms`, port, Date.now() - startTime);
    });
  }
}

module.exports = App;
