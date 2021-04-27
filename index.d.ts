import '@zenweb/log';
import '@zenweb/router';
import '@zenweb/helper';
import '@zenweb/service';
export { Core } from '@zenweb/core';
export { ApiFail, ApiFailDetail } from '@zenweb/api';
export { Service } from '@zenweb/service';
import { CoreOptions } from '@zenweb/core';
import { ServiceOptions } from '@zenweb/service';
import { ApiOptions } from '@zenweb/api';
import { Core } from '@zenweb/core';
import { IKoaBodyOptions as BodyOptions } from '@zenweb/body';
import { RouterOptions } from '@zenweb/router';

interface CreateOptions {
  core?: CoreOptions;
  api?: ApiOptions;
  body?: BodyOptions;
  router?: RouterOptions;
  service?: ServiceOptions;
}

export declare function create(options?: CreateOptions): Core;
