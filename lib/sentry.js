'use strict';

const Sentry = require('@sentry/node');

/**
 * @param {import('koa')} app 
 * @param {string} dsn
 */
function setup(app, dsn) {
  Sentry.init({ dsn });
  app.on('error', (err, ctx) => {
    if (ctx) {
      Sentry.withScope(scope => {
        scope.addEventProcessor(event => Sentry.Handlers.parseRequest(event, ctx.request));
        Sentry.captureException(err);
      });
    } else {
      Sentry.captureException(err);
    }
  });
}

module.exports = setup;
