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
import { SentryOptions } from '@zenweb/sentry';
import { MetricOptions } from '@zenweb/metric';
import { CorsOptions } from '@zenweb/cors';
import { ValidationOptions } from '@zenweb/validation';
import { MySQLOptions } from '@zenweb/mysql';
import { ViewOptions } from '@zenweb/view';
import { ScheduleOptions } from '@zenweb/schedule';

interface CreateOptions {
  core?: CoreOptions;
  api?: ApiOptions;
  body?: BodyOptions;
  router?: RouterOptions;
  service?: ServiceOptions;
  // optional
  sentry?: SentryOptions;
  metric?: MetricOptions;
  cors?: CorsOptions;
  validation?: ValidationOptions;
  mysql?: MySQLOptions;
  view?: ViewOptions;
  schedule?: ScheduleOptions;
}

export declare function create(options?: CreateOptions): Core;
