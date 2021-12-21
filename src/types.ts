import { CoreOptions } from '@zenweb/core';
import { ServiceOption } from '@zenweb/service';
import { ApiOption } from '@zenweb/api';
import { BodyOption } from '@zenweb/body';
import { RouterOption } from '@zenweb/router';
import { SentryOptions } from '@zenweb/sentry';
import { MetricOptions } from '@zenweb/metric';
import { CorsOption } from '@zenweb/cors';
import { ValidationOptions } from '@zenweb/validation';
import { MySQLOptions } from '@zenweb/mysql';
import { ViewOptions } from '@zenweb/view';
import { ScheduleOptions } from '@zenweb/schedule';
import { MessageCodeOption } from '@zenweb/messagecode';
import { FormOption } from '@zenweb/form';

export interface CreateOptions {
  [key: string]: any;

  core?: CoreOptions;
  api?: ApiOption;
  body?: BodyOption;
  router?: RouterOption;
  service?: ServiceOption;
  // optional
  sentry?: SentryOptions;
  metric?: MetricOptions;
  cors?: CorsOption;
  validation?: ValidationOptions;
  mysql?: MySQLOptions;
  view?: ViewOptions;
  schedule?: ScheduleOptions;
  messageCode?: MessageCodeOption;
  form?: FormOption;
}
