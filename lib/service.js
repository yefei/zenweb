'use strict';

class Service {
  /**
   * @param {import('koa').Context} ctx 
   */
  constructor(ctx) {
    this.ctx = ctx;
  }
}

/**
 * 安装 service 服务
 * @param {import('./core')} core
 */
function setup(core) {
  const app = core.koa;
  app.context.service = function service(cls) {
    if (!this[cls]) {
      this[cls] = new cls(this);
    }
    return this[cls];
  };
}

module.exports = {
  Service,
  setup,
};
