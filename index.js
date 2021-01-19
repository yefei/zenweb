'use strict';

const Core = require('./lib/core');
const { ApiFail } = require('./lib/api');
const { Service } = require('./lib/service');

/**
 * @param {object} [options] 配置项
 * @param {object} [options.api] API配置
 * @param {number} [options.api.failCode=undefined] 默认失败代码
 * @param {number} [options.api.failHttpCode=422] 默认失败HTTP状态码
 * @param {function(object):object} [options.api.success] 成功结果包装
 * @param {function(ApiFail):object} [options.api.fail] 失败结果包装
 * @returns {Core}
 */
function create(options) {
  return new Core(options);
}

module.exports = {
  Core,
  ApiFail,
  Service,
  create,
};
