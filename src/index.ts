import inject from '@zenweb/inject';
import meta from '@zenweb/meta';
import log from '@zenweb/log';
import router from '@zenweb/router';
import messagecode from '@zenweb/messagecode';
import body from '@zenweb/body';
import result from '@zenweb/result';
import helper from '@zenweb/helper';
import controller from '@zenweb/controller';
import { Core } from '@zenweb/core';
import { CreateOptions } from './types';
export { init, inject, factory, scope } from '@zenweb/inject';
export { Router } from '@zenweb/router';
export { ResultFail } from '@zenweb/result';
export { Controller, controller, mapping } from '@zenweb/controller';
export { Next, SetupFunction, Context, Middleware } from '@zenweb/core';
export { Body, BodyHelper } from '@zenweb/body';
export { QueryHelper, TypeCastHelper } from '@zenweb/helper';

export {
  Core,
  CreateOptions,
}

/**
 * @param options 模块配置项
 */
export function create(options?: CreateOptions) {
  options = options || {};
  const core = new Core(options.core);
  if (options.inject !== false) core.setup(inject());
  if (options.meta !== false) core.setup(meta(options.meta));
  if (options.log !== false) core.setup(log(options.log));
  if (options.router !== false) core.setup(router());
  if (options.messagecode !== false) core.setup(messagecode(options.messagecode));
  if (options.body !== false) core.setup(body(options.body));
  if (options.result !== false) core.setup(result(options.result));
  if (options.helper !== false) core.setup(helper(options.helper));
  if (options.controller !== false) core.setup(controller(options.controller));
  return core;
}
