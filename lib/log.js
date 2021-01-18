'use strict';

const pino = require('pino');

/**
 * 初始化 logger
 * @returns {pino.Logger}
 */
function initLogger() {
  let logdest;
  if (process.env.LOG_FILE) {
    logdest = pino.destination(process.env.LOG_FILE);
    process.on('SIGHUP', () => {
      console.log('reopen log file');
      logdest.reopen();
    });
  }

  const logger = pino(logdest);

  process.on('uncaughtException', pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'uncaughtException');
    process.exit(1);
  }));

  process.on('unhandledRejection', pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'unhandledRejection');
    process.exit(1);
  }));

  return logger;
}

/**
 * @param {import('koa').Context} ctx 
 * @param {*} next 
 */
function contextLogger(ctx, next) {
  ctx.startTime = Date.now();
  ctx.log = ctx.app.log.child({
    method: ctx.method,
    url: ctx.url,
    host: ctx.host,
    ip: ctx.ip,
  });
  return next();
}

/**
 * 记录应用错误日志
 * @param {import('koa')} app 
 * @param {pino.Logger} logger
 */
function setupAppLogger(app, logger) {
  app.log = logger;
  app.on('error', (err, ctx) => {
    if (ctx) {
      ctx.log.error(err);
    } else {
      logger.error(err);
    }
  });
}

/**
 * @param {import('./core')} core 
 */
function setup(core) {
  const logger = initLogger();
  setupAppLogger(core.koa, logger);
  core.koa.use(contextLogger);
}

module.exports = setup;
