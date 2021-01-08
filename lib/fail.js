/**
 * ctx.fail
 */
'use strict';

const FAIL_BODY = Symbol('jiango#failBody');

function wrapFail({ failCode, failHttpCode }) {
  const defaultErrorCode = failCode || -1;
  const defaultHttpCode = failHttpCode || 422;
  /**
   * 统一返回错误信息
   * @param {string|object} msg 错误消息 | 消息对象
   * @param {string} msg.message 错误消息
   * @param {number} [msg.code] 错误代码
   * @param {number} [msg.httpCode] 自定义 http-code
   * @param {*} [msg.data] 附加数据
   * @throws {HttpError}
   */
  return function fail(msg) {
    const { code, message, data, httpCode } = typeof msg === 'object' ? msg : { message: msg };
    const err = new Error(message);
    err.expose = true;
    err.status = httpCode || defaultHttpCode || 422;
    err[FAIL_BODY] = {
      code: code || defaultErrorCode,
      message,
      data,
    };
    throw err;
  };
}

/**
 * 安装拦截 fail 错误
 * @param {import('./core')} app
 * @param {object} [options]
 * @param {number} [options.failCode] 错误代码
 * @param {number} [options.failHttpCode] HTTP状态码
 */
function setup(app, options) {
  const originContextOnError = app.koa.context.onerror;

  /**
   * 自定义错误处理
   * @param {Error} err 
   */
  app.koa.context.onerror = function onerror(err) {
    if (null == err) return;
    if (!err[FAIL_BODY]) return originContextOnError.call(this, err);
    // respond
    const msg = JSON.stringify(err[FAIL_BODY]);
    this.type = 'json';
    this.status = err.status || err.statusCode || 422;
    this.length = Buffer.byteLength(msg);
    this.res.end(msg);
  };

  app.koa.context.fail = wrapFail(options);
}

module.exports = setup;
