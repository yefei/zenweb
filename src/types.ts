import { CoreOption } from '@zenweb/core';
import { MetaOption } from '@zenweb/meta';
import { LogOption } from '@zenweb/log';
import { MessageCodeOption } from '@zenweb/messagecode';
import { BodyOption } from '@zenweb/body';
import { ResultOption } from '@zenweb/result';
import { HelperOption } from '@zenweb/helper';
import { ControllerOption } from '@zenweb/controller';

export interface CreateOptions {
  core?: CoreOption;
  inject?: false;
  meta?: MetaOption | false;
  log?: LogOption | false;
  router?: false;
  messagecode?: MessageCodeOption | false;
  body?: BodyOption | false;
  result?: ResultOption | false;
  helper?: HelperOption | false;
  controller?: ControllerOption | false;
}
