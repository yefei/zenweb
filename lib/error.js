'use strict';

const createError = require('http-errors');
const { logger } = require('./log');
const FAIL_BODY = Symbol('FAIL_BODY');

/**
 * @param {import('koa')} app 
 */
function sentry(app) {
  const Sentry = require('@sentry/node');
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

let originContextOnError;

/**
 * 自定义错误处理
 * @param {Error} err 
 */
function onerror(err) {
  if (null == err) return;
  if (!err[FAIL_BODY]) return originContextOnError.call(this, err);
  // respond
  const msg = JSON.stringify(err[FAIL_BODY]);
  this.type = 'json';
  this.status = err.status || err.statusCode || 422;
  this.length = Buffer.byteLength(msg);
  this.res.end(msg);
}

/**
 * @param {import('koa')} app 
 */
function setupError(app) {
  if (process.env.SENTRY_DSN) {
    sentry(app);
  }

  // 记录错误信息
  app.on('error', (err, ctx) => {
    if (ctx) {
      ctx.log.error(err);
    } else {
      logger.error(err);
    }
  });

  // 自定义常规错误 fail
  originContextOnError = app.context.onerror;
  app.context.onerror = onerror;
}

module.exports = {
  setupError,
  fail,
};
