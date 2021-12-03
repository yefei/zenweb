'use strict';

const { Core } = require('@zenweb/core');
const { ApiFail } = require('@zenweb/api');
const { Service } = require('@zenweb/service');

// 可选模块
const OPTIONAL_MODULES = {
  sentry: '@zenweb/sentry',
  metric: '@zenweb/metric',
  cors: '@zenweb/cors',
  validation: '@zenweb/validation',
  mysql: '@zenweb/mysql',
  view: '@zenweb/view',
  schedule: '@zenweb/schedule',
  form: '@zenweb/form',
};

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
  core.setup('@zenweb/messagecode', options.messageCode);
  core.setup('@zenweb/helper');
  core.setup('@zenweb/body', Object.assign({
    onError(error, ctx) {
      ctx.log.warn('request body error: %s', error);
      ctx.fail('request body error: ' + error.message);
    },
  }, options.body));
  core.setup('@zenweb/service', options.service);
  for (const [name, mod] of Object.entries(OPTIONAL_MODULES)) {
    if (options[name]) {
      core.setup(mod, options[name]);
    }
  }
  return core;
}

module.exports = {
  Core,
  ApiFail,
  Service,
  create,
};
