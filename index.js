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
let logdest;
if (process.env.JIANGO_LOG_FILE) {
  logdest = pino.destination(process.env.JIANGO_LOG_FILE);
  process.on('SIGHUP', () => {
    console.log('reopen log file');
    logdest.reopen();
  });
}

const logger = pino(logdest);

process.on('uncaughtException', pino.final(logger, (err, finalLogger) => {
  finalLogger.error(err, 'uncaughtException');
  process.exit(1);
}));

process.on('unhandledRejection', pino.final(logger, (err, finalLogger) => {
  finalLogger.error(err, 'unhandledRejection');
  process.exit(1);
}));

function ctxLog(ctx, next) {
  ctx.log = logger.child({
    method: ctx.method,
    url: ctx.url,
    host: ctx.host,
    ip: ctx.ip,
  });
  return next();
}

app.use(ctxLog);

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
 * @param {string|object} msg 错误消息 | 消息对象
 * @param {string} msg.message 错误消息
 * @param {number} [msg.code] 错误代码
 * @param {*} [msg.data] 附加数据
 * @throws {HttpError}
 */
function fail(msg) {
  const { code, message, data } = typeof msg === 'object' ? msg : { message: msg };
  const err = createError(422, message);
  err[FAIL_BODY] = {
    code,
    message,
    data,
  };
  throw err;
}

const originContextOnError = app.context.onerror;

/**
 * 自定义错误处理
 * @param {Error} err 
 */
app.context.onerror = function(err) {
  if (null == err) return;
  if (!err[FAIL_BODY]) return originContextOnError.call(this, err);
  // respond
  const msg = JSON.stringify(err[FAIL_BODY]);
  this.type = 'json';
  this.status = err.status || err.statusCode || 422;
  this.length = Buffer.byteLength(msg);
  this.res.end(msg);
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
