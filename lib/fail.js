/**
 * ctx.fail
 */
'use strict';

const FAIL_BODY = Symbol.for('jiango#failBody');
const DEFAULT_CODE = Symbol.for('jiango#failDefaultCode');
const DEFAULT_HTTP_CODE = Symbol.for('jiago#failDefaultHttpCode');

/**
 * 统一返回错误信息
 * @param {string|object} msg 错误消息 | 消息对象
 * @param {string} msg.message 错误消息
 * @param {number} [msg.code] 错误代码
 * @param {number} [msg.httpCode] 自定义 http-code
 * @param {*} [msg.data] 附加数据
 * @throws {HttpError}
 */
function fail(msg) {
  const { code, message, data, httpCode } = typeof msg === 'object' ? msg : { message: msg };
  const err = new Error(message);
  err.expose = true;
  err.status = httpCode || global[DEFAULT_HTTP_CODE] || 422;
  err[FAIL_BODY] = {
    code: code || global[DEFAULT_CODE],
    message,
    data,
  };
  throw err;
}

/**
 * 设置默认错误代码
 * @param {*} param0 
 * @param {number} [param0.failCode] 错误代码
 * @param {number} [param0.failHttpCode] HTTP状态码
 */
function setFailOptions({ failCode, failHttpCode }) {
  global[DEFAULT_CODE] = failCode || -1;
  global[DEFAULT_HTTP_CODE] = failHttpCode || 422;
}

/**
 * 安装拦截 fail 错误
 * @param {import('koa')} app
 */
function setupFail(app) {
  const originContextOnError = app.context.onerror;
  /**
   * 自定义错误处理
   * @param {Error} err 
   */
  app.context.onerror = function onerror(err) {
    if (null == err) return;
    if (!err[FAIL_BODY]) return originContextOnError.call(this, err);
    // respond
    const msg = JSON.stringify(err[FAIL_BODY]);
    this.type = 'json';
    this.status = err.status || err.statusCode || 422;
    this.length = Buffer.byteLength(msg);
    this.res.end(msg);
  };
}

module.exports = {
  fail,
  setupFail,
  setFailOptions,
};
