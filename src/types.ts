import { CoreOption } from '@zenweb/core';
import { MetaOption } from '@zenweb/meta';
import { LogOption } from '@zenweb/log';
import { MessageCodeOption } from '@zenweb/messagecode';
import { BodyOption } from '@zenweb/body';
import { ApiOption } from '@zenweb/api';
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
  api?: ApiOption | false;
  helper?: HelperOption | false;
  controller?: ControllerOption | false;
}
