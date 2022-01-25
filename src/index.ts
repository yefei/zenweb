import meta from '@zenweb/meta';
import log from '@zenweb/log';
import router from '@zenweb/router';
import messagecode from '@zenweb/messagecode';
import body from '@zenweb/body';
import service from '@zenweb/service';
import api from '@zenweb/api';
import helper from '@zenweb/helper';
import { Core, SetupFunction } from '@zenweb/core';
import { CreateOptions } from './types';
export { Router } from '@zenweb/router';
export { ApiFail } from '@zenweb/api';
export { Service } from '@zenweb/service';
export * from './types';

export {
  Core,
  SetupFunction,
}

/**
 * @param options 模块配置项
 */
export function create(options: CreateOptions) {
  options = options || {};
  const core = new Core(options.core);
  if (options.meta !== false) core.setup(meta(options.meta));
  if (options.log !== false) core.setup(log(options.log));
  if (options.router !== false) core.setup(router(options.router));
  if (options.messagecode !== false) core.setup(messagecode(options.messagecode));
  if (options.body !== false) core.setup(body(options.body));
  if (options.service !== false) core.setup(service(options.service));
  if (options.api !== false) core.setup(api(options.api));
  if (options.helper !== false) core.setup(helper());
  return core;
}
