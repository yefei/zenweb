import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import * as pino from "pino";
import * as bodyParser from "koa-bodyparser";

export interface ApiFailDetail {
  message?: string;
  code?: number;
  httpCode?: number;
  data?: any;
}

export declare class ApiFail extends Error {
  constructor(message?: string, code?: number, data?: any, httpCode?: number);
}

interface ApiOptions {
  failCode?: number;
  failHttpCode?: number;
  success?(data: any): any;
  fail?(err: ApiFail): any;
}

interface CoreOptions {
  api?: ApiOptions;
  bodyParser?: bodyParser.Options;
}

export type setupCallback = (core: Core, options?: any) => Promise<void>;

export declare class Core {
  constructor(options: CoreOptions);
  koa: Koa;
  router: KoaRouter;
  loaded: string[];
  log: pino.Logger;
  defineContextCacheProperty(prop: string | number | symbol, get: (ctx: Koa.Context) => any): void;
  check(mod: string): Core;
  setup(mod: string | setupCallback, options?: any, name?: string): Core;
  boot(): Promise<void>;
  listen(port?: number): void;
  start(port?: number): void;
}

export declare class Service {
  protected ctx: Koa.Context;
  constructor(ctx: Koa.Context);
}

type serviceClass = <T extends Service> () => { new(ctx: Context): T };
export declare function registerService(cls: serviceClass, name?: string): Map<string, serviceClass>;

export declare function create(options: CoreOptions): Core;

type typeCastPickFields = (string | { [key: string]: string | ((value: any, defaultValue: any) => any) })[];

declare interface Helper {
  query(...fields: typeCastPickFields): { [key: string]: any };
  body(...fields: typeCastPickFields): { [key: string]: any };
  params(...fields: typeCastPickFields): { [key: string]: any };
}

export declare interface Services {
}

declare module 'koa' {
  interface BaseContext {
    // Core
    core: Core;

    // Log
    startTime: number;
    log: pino.Logger;

    // API
    fail(msg: string | ApiFailDetail): never;
    success(data: any): any;

    // Service
    service: Services;

    // Helper
    helper: Helper;
  }
}
