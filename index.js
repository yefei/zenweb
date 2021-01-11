'use strict';

const Core = require('./lib/core');

/**
 * @param {object} [options] 配置项
 * @param {object} [options.fail] 业务失败时配置项
 * @param {number} [options.fail.defaultCode=undefined] 默认失败代码
 * @param {number} [options.fail.defaultHttpCode=422] 默认失败HTTP状态码
 * @returns {Core}
 */
module.exports = function core(options) {
  return new Core(options);
};
