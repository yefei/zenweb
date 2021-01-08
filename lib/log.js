'use strict';

const pino = require('pino');
const LOGGER = Symbol.for('jiango#logger');

/**
 * 初始化 logger
 * @returns {pino.Logger}
 */
function initLogger() {
  if (global[LOGGER]) return global[LOGGER];

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

  global[LOGGER] = logger;
  return logger;
}

const logger = initLogger();

/**
 * @param {import('koa').Context} ctx 
 * @param {*} next 
 */
function contextLogger(ctx, next) {
  ctx.log = logger.child({
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
function setupAppErrorLog(app, logger) {
  app.on('error', (err, ctx) => {
    if (ctx) {
      ctx.log.error(err);
    } else {
      logger.error(err);
    }
  });
}

/**
 * @param {import('koa')} app 
 */
function setupLogger(app) {
  setupAppErrorLog(app, logger);
  app.use(contextLogger);
}

module.exports = {
  logger,
  setupLogger,
};
