'use strict';

const Sentry = require('@sentry/node');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-pino-logger');
const globby = require('globby');
const fs = require('fs');
const path = require('path');

// Sentry
if (process.env.SENTRY_DSN) {
  console.log('SENTRY_DSN:', process.env.SENTRY_DSN);
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  app.on('error', (err, ctx) => {
    Sentry.withScope(scope => {
      scope.addEventProcessor(event => Sentry.Handlers.parseRequest(event, ctx.request));
      Sentry.captureException(err);
    });
  });
}

// Koa
const app = new Koa();
const router = new Router();

app.use(logger({
  level: process.env.LOGGER_LEVEL || 'warn',
}));

app.use(bodyParser());

/**
 * 统一返回错误信息
 * 
 * @param {Koa.ParameterizedContext} ctx 
 * @param {string} msg 错误消息
 * @param {any} [data] 附加数据
 * @param {number} [code=1] 错误代码
 */
function fail(ctx, msg, data, code = 1) {
  ctx.log.warn('fail[%s]: %s %s', code, msg, data);
  ctx.status = 422;
  ctx.body = {
    code,
    msg,
    data,
  };
}

/**
 * 加载 app/ 文件夹内的文件
 */
function load() {
  const directory = path.join(process.cwd(), 'app');
  for (const filepath of globby.sync('**/*.js', { cwd: directory })) {
    const fullpath = path.join(directory, filepath);
    if (!fs.statSync(fullpath).isFile()) continue;
    try {
      require(fullpath);
    } catch (e) {
      console.error('load error:', filepath, e);
    }
  }
}

/**
 * 启动服务
 * @param {number} [port=7001] 监听端口
 */
function start(port = 7001) {
  const startTime = Date.now();
  load();
  // 打印出已经加载的路由
  router.stack.forEach(i => console.log('Router:', i.methods.join(','), i.path));
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(port, () => {
    console.log(`Server on ${port}.`, Date.now() - startTime, 'ms');
  });
}

module.exports = {
  app,
  router,
  fail,
  start,
};
