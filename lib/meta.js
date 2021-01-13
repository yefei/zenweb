'use strict';

const { version } = require('../package.json');

/**
 * 服务器信息
 * @param {import('koa').Context} ctx 
 * @param {*} next 
 */
async function meta(ctx, next) {
  ctx.set('X-Powered-By', `jiango/${version} node/${process.version}`);
  await next();
  ctx.set('X-Readtime', Date.now() - ctx.startTime);
}

module.exports = meta;
