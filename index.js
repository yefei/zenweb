'use strict';

const { Core } = require('@zenweb/core');
const { ApiFail } = require('@zenweb/api');
const { Service } = require('@zenweb/service');

/**
 * @param {object} [options] 配置项
 * @returns {Core}
 */
function create(options) {
  options = options || {};
  const core = new Core(options.core);
  core.setup('@zenweb/meta');
  core.setup('@zenweb/log');
  core.setup('@zenweb/router', options.router);
  core.setup('@zenweb/api', options.api);
  core.setup('@zenweb/helper');
  core.setup('@zenweb/body', options.body);
  core.setup('@zenweb/service', options.service);
  return core;
}

module.exports = {
  Core,
  ApiFail,
  Service,
  create,
};
