'use strict';

const pino = require('pino');

// logger
let logdest;
if (process.env.JIANGO_LOG_FILE) {
  logdest = pino.destination(process.env.JIANGO_LOG_FILE);
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

/**
 * @param {import('koa').Context} ctx 
 * @param {*} next 
 */
function ctxLog(ctx, next) {
  ctx.log = logger.child({
    method: ctx.method,
    url: ctx.url,
    host: ctx.host,
    ip: ctx.ip,
  });
  return next();
}

module.exports = {
  logger,
  ctxLog,
};
