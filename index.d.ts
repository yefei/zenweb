import '@zenweb/log';
import '@zenweb/router';
import '@zenweb/helper';
import '@zenweb/service';
export { Core } from '@zenweb/core';
export { ApiFail, ApiFailDetail } from '@zenweb/api';
export { Service } from '@zenweb/service';
import { ApiOptions } from '@zenweb/api';
import { Core } from '@zenweb/core';
import { Options as BodyOptions } from '@zenweb/body';
import { RouterOptions } from '@zenweb/router';

interface CoreOptions {
  api?: ApiOptions;
  bodyParser?: BodyOptions;
  router?: RouterOptions;
}

export declare function create(options?: CoreOptions): Core;
