'use strict';

const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const { ctxLog } = require('./log');
const load = require('./load');
const { setupError } = require('./error');

// Koa
const app = new Koa();
const router = new Router();

app.use(ctxLog);
app.use(bodyParser());

setupError(app);

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
