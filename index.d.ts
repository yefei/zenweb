/// <reference types="node" />
import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import * as pino from "pino";

export = core;

declare function core(options: CoreOptions): Core;

interface ApiFailDetail {
  message?: string;
  code?: number;
  httpCode?: number;
  data?: any;
}

declare class FailError extends Error {
  constructor(message?: string, code?: number, data?: any, httpCode?: number);
}

interface ApiOptions {
  failCode?: number;
  failHttpCode?: number;
  success?(data: any): any;
  fail?(err: FailError): any;
}

interface CoreOptions {
  api?: ApiOptions;
}

type setupCallback = (core: Core, options?: any) => Promise<void>;

declare class Core {
  constructor(options: CoreOptions);
  koa: Koa;
  router: KoaRouter;
  loaded: string[];
  log: pino.Logger;
  defineContextCacheProperty(prop: string | number | symbol, get: function(Koa.Context)): void;
  check(mod: string): Core;
  setup(mod: string | setupCallback, options?: any, name?: string): Core;
  boot(): Promise<void>;
  listen(port?: number): void;
  start(port?: number): void;
}

declare module 'koa' {
  class Application extends Koa {
    log: pino.Logger;
  }

  interface BaseContext {
    // Log
    startTime: number;
    log: pino.Logger;

    // API
    fail(msg: string | ApiFailDetail): never;
    success(data: any): any;
  }
}
