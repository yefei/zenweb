'use strict';

const { typeCastPick } = require('./utils');

class Helper {
  /**
   * @param {import('koa').Context} ctx
   */
  constructor(ctx) {
    this.ctx = ctx;
  }

  /**
   * query('keyword', { limit: Number, offset: 'number:0', is: Boolean })
   * @param  {...any} fields 
   */
  query(...fields) {
    return typeCastPick(this.ctx.query, fields);
  }

  body(...fields) {
    return typeCastPick(this.ctx.request.body, fields);
  }

  params(...fields) {
    return typeCastPick(this.ctx.params, fields);
  }
}

/**
 * 安装 helper 服务
 * @param {import('./core')} core
 */
function setup(core) {
  core.defineContextCacheProperty('helper', ctx => new Helper(ctx));
}

module.exports = setup;
