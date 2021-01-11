/**
 * Sentry 模块
 * 使用此模块需要在项目中安装 @sentry/node
 * 并且使用 app.setup('jiango/mod/sentry', { dsn: 'xxxxx' }) 启用模块
 */
'use strict';

const debug = require('debug')('jiango:sentry');
const Sentry = require('@sentry/node');

/**
 * @param {import('../lib/core')} core 
 * @param {Sentry.NodeOptions} options
 */
function sentry(core, options) {
  const app = core.koa;
  debug('options: %o', options);
  Sentry.init(options);
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

module.exports = sentry;
