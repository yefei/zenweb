'use strict';

const pino = require('pino');

/**
 * 初始化 logger
 * @returns {pino.Logger}
 */
function initLogger(logFile) {
  let logdest;
  if (logFile) {
    logdest = pino.destination(logFile);
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
 * 设置 koa.ctx.log
 * @param {pino.Logger} logger
 */
function contextLogger(logger) {
  /**
   * @param {import('koa').Context} ctx 
   * @param {*} next 
   */
  return function contextLogger(ctx, next) {
    ctx.log = logger.child({
      method: ctx.method,
      url: ctx.url,
      host: ctx.host,
      ip: ctx.ip,
    });
    return next();
  };
}

/**
 * 记录应用错误日志
 * @param {import('./core')} app 
 * @param {pino.Logger} logger
 */
function setupAppErrorLog(app, logger) {
  app.koa.on('error', (err, ctx) => {
    if (ctx) {
      ctx.log.error(err);
    } else {
      logger.error(err);
    }
  });
}

/**
 * @param {import('./core')} app 
 */
function setup(app) {
  const logger = initLogger(process.env.LOG_FILE);
  setupAppErrorLog(app, logger);
  app.use(contextLogger(logger));
}

module.exports = setup;
