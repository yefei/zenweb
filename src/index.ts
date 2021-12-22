import '@zenweb/meta';
import '@zenweb/log';
import '@zenweb/router';
import '@zenweb/api';
import '@zenweb/helper';
import '@zenweb/service';
import '@zenweb/messagecode';
import '@zenweb/body';

import { Core } from '@zenweb/core';
import { CreateOptions } from './types';
export { Router } from '@zenweb/router';
export { ApiFail } from '@zenweb/api';
export { Service } from '@zenweb/service';
export * from './types';

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
  orm: '@zenweb/orm',
};

/**
 * @param options 模块配置项
 */
export function create(options: CreateOptions) {
  options = options || {};
  const core = new Core(options.core);
  core.setup('@zenweb/meta');
  core.setup('@zenweb/log');
  core.setup('@zenweb/router', options.router);
  core.setup('@zenweb/api', options.api);
  core.setup('@zenweb/helper');
  core.setup('@zenweb/service', options.service);
  core.setup('@zenweb/messagecode', options.messageCode);
  core.setup('@zenweb/body', options.body);
  // 安装可选项
  for (const [key, name] of Object.entries(OPTIONAL_MODULES)) {
    if (key in options) {
      core.setup(name, options[key]);
    }
  }
  return core;
}
