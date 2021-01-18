'use strict';

const Core = require('./lib/core');

/**
 * @param {object} [options] 配置项
 * @param {object} [options.api] API配置
 * @param {number} [options.api.failCode=undefined] 默认失败代码
 * @param {number} [options.api.failHttpCode=422] 默认失败HTTP状态码
 * @param {function(object):object} [options.api.success] 成功结果包装
 * @param {function(import('./lib/api').ApiFail):object} [options.api.fail] 失败结果包装
 * @returns {Core}
 */
module.exports = function core(options) {
  return new Core(options);
};
