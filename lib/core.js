'use strict';

const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const load = require('./load');
const { setupLogger } = require('./log');
const { setupFail } = require('./fail');

const APP = Symbol.for('jiango#app');
const ROUTER = Symbol.for('jiango#router');

/**
 * 初始化KOA
 * @returns {Koa}
 */
function initApp() {
  if (global[APP]) return global[APP];
  const app = new Koa();
  setupLogger(app);
  setupFail(app);
  app.use(bodyParser());
  global[APP] = app;
  return app;
}

/**
 * @type {Koa}
 */
const app = initApp();

/**
 * 初始化路由
 * @returns {Router}
 */
function initRouter() {
  if (global[ROUTER]) return global[ROUTER];
  const router = new Router();
  global[ROUTER] = router;
  return router;
}

/**
 * @type {Router}
 */
const router = initRouter();

/**
 * 启动服务
 * @param {number} [port] 监听端口
 */
function start(port) {
  const startTime = Date.now();
  const directory = path.join(process.cwd(), 'app');
  if (fs.existsSync(directory)) {
    load(directory);
  }
  // 打印出已经加载的路由
  router.stack.forEach(i => console.log('Router: [%s] %s', i.methods.join(','), i.path));
  app.use(router.routes());
  app.use(router.allowedMethods());
  port = port || Number(process.env.PORT) || 7001;
  app.listen(port, () => {
    console.log(`Server: %s. %o ms`, port, Date.now() - startTime);
  });
}

module.exports = {
  app,
  router,
  start,
};
