import { CoreOption } from '@zenweb/core';
import { MetaOption } from '@zenweb/meta';
import { LogOption } from '@zenweb/log';
import { RouterOption } from '@zenweb/router';
import { MessageCodeOption } from '@zenweb/messagecode';
import { BodyOption } from '@zenweb/body';
import { ServiceOption } from '@zenweb/service';
import { ApiOption } from '@zenweb/api';
import { HelperOption } from '@zenweb/helper';

export interface CreateOptions {
  [key: string]: any;

  core?: CoreOption;
  meta?: MetaOption | false;
  log?: LogOption | false;
  router?: RouterOption | false;
  messagecode?: MessageCodeOption | false;
  body?: BodyOption | false;
  service?: ServiceOption | false;
  api?: ApiOption | false;
  helper?: HelperOption | false;
}
