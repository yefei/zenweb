/**
 * ctx.fail
 */
'use strict';

const debug = require('debug')('jiango:fail');
const FAIL_BODY = Symbol('jiango#failBody');

/**
 * 安装拦截 fail 错误
 * @param {import('./core')} core
 * @param {object} [options] 失败配置
 * @param {number} [options.defaultCode=undefined] 默认失败代码
 * @param {number} [options.defaultHttpCode=422] 默认失败HTTP状态码
 */
function fail(core, options) {
  const app = core.koa;
  const originContextOnError = app.context.onerror;

  options = Object.assign({
    defaultHttpCode: 422,
  }, options);

  debug('options: %o', options);

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

  /**
   * 在 ctx 中安装 fail 函数
   * @param {string|object} msg 错误消息 | 消息对象
   * @param {string} msg.message 错误消息
   * @param {number} [msg.code] 错误代码
   * @param {number} [msg.httpCode] 自定义 http-code
   * @param {*} [msg.data] 附加数据
   * @throws {HttpError}
   */
  app.context.fail = function fail(msg) {
    const { code, message, data, httpCode } = typeof msg === 'object' ? msg : { message: msg };
    const err = new Error(message);
    err.expose = true;
    err.status = httpCode || options.defaultHttpCode || 422;
    err[FAIL_BODY] = {
      code: code || options.defaultCode,
      message,
      data,
    };
    throw err;
  };
}

module.exports = fail;
