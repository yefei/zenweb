/// <reference types="node" />
import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import * as pino from "pino";

export = core;

function core(options: CoreOptions): Core;

interface ApiFailDetail {
  message?: string;
  code?: number;
  httpCode?: number;
  data?: any;
}

class FailError extends Error {
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

type modsetup = function(core: Core, options?: any): Promise;

class Core {
  constructor(options: CoreOptions);
  koa: Koa;
  router: KoaRouter;
  loaded: string[];
  check(mod: string): Core;
  setup(mod: string | modsetup, options?: any, name?: string): Core;
  boot(): Promise;
  listen(port?: number): void;
  start(port?: number): void;
}

declare module 'koa' {
  declare class Application extends Koa {
    log: pino.Logger;
  }

  declare interface BaseContext {
    // Log
    startTime: number;
    log: pino.Logger;

    // API
    fail(msg: string | ApiFailDetail): never;
    success(data: any): any;
  }
}
