'use strict';

const Sentry = require('@sentry/node');
const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const pino = require('pino');
const globby = require('globby');
const fs = require('fs');
const path = require('path');
const createError = require('http-errors');
const FAIL_BODY = Symbol('FAIL_BODY');

// Koa
const app = new Koa();
const router = new Router();

// logger
const logger = pino();
app.use(function(ctx, next) {
  ctx.log = logger.child({
    method: ctx.method,
    url: ctx.url,
    host: ctx.host,
    ip: ctx.ip,
  });
  return next();
});

// Sentry
if (process.env.SENTRY_DSN) {
  logger.info('SENTRY_DSN: %s', process.env.SENTRY_DSN);
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  app.on('error', (err, ctx) => {
    if (ctx) {
      Sentry.withScope(scope => {
        scope.addEventProcessor(event => Sentry.Handlers.parseRequest(event, ctx.request));
        Sentry.captureException(err);
      });
    } else {
      Sentry.captureException(err);
    }
  });
}

// 记录错误信息
app.on('error', (err, ctx) => {
  if (ctx) {
    ctx.log.error(err);
  } else {
    logger.error(err);
  }
});

/**
 * 统一返回错误信息
 * @param {string} message 错误消息
 * @param {number} [code=1] 错误代码
 * @param {any} [data] 附加数据
 */
function fail(message, code = 1, data) {
  const err = createError(422, message);
  err[FAIL_BODY] = {
    code,
    message,
    data,
  };
  throw err;
}

/**
 * 自定义错误处理
 * @param {Error} err 
 */
app.context.onerror = function(err) {
  if (null == err) return;
  if (!err.expose) {
    this.app.emit('error', err, this);
  }
  this.status = err.status || 500;
  this.type = 'json';
  this.body = JSON.stringify(err[FAIL_BODY] || this.body || { code: 1, message: err.message });
  this.length = Buffer.byteLength(this.body);
  this.res.end(this.body);
};

// POST 内容解析
app.use(bodyParser());

/**
 * 加载目录内的js文件
 * @param {string} directory 目标目录
 */
function load(directory) {
  let count = 0;
  for (const filepath of globby.sync('**/*.js', { cwd: directory })) {
    const fullpath = path.join(directory, filepath);
    if (!fs.statSync(fullpath).isFile()) continue;
    try {
      require(fullpath);
      count++;
    } catch (e) {
      console.error('Load error: %s, %s', fullpath, e.message);
    }
  }
  console.log('Loaded: %s %o files', directory, count);
}

/**
 * 启动服务
 * @param {number} [port=7001] 监听端口
 */
function start(port = 7001) {
  const startTime = Date.now();
  const directory = path.join(process.cwd(), 'app');
  if (fs.existsSync(directory)) {
    load(directory);
  }
  // 打印出已经加载的路由
  router.stack.forEach(i => console.log('Router: [%s] %s', i.methods.join(','), i.path));
  app.use(router.routes());
  app.use(router.allowedMethods());
  app.listen(port, () => {
    console.log(`Server: %s. %o ms`, port, Date.now() - startTime);
  });
}

module.exports = {
  app,
  router,
  logger,
  load,
  fail,
  start,
};
