'use strict';

const { version } = require('../package.json');

/**
 * 服务器信息
 * @param {import('koa').Context} ctx 
 * @param {*} next 
 */
async function meta(ctx, next) {
  ctx.startTime = Date.now();
  ctx.set('X-Powered-By', `jiango/${version} node/${process.version}`);
  await next();
  ctx.set('X-Process-Time', Date.now() - ctx.startTime);
}

module.exports = meta;
