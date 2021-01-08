'use strict';

const Sentry = require('@sentry/node');

/**
 * @param {import('./core')} app 
 * @param {string} dsn
 */
function setup(app, dsn) {
  Sentry.init({ dsn });
  app.koa.on('error', (err, ctx) => {
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
