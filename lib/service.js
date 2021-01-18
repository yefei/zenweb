'use strict';

class Service {
  /**
   * @param {import('koa').BaseContext} ctx 
   */
  constructor(ctx) {
    this.ctx = ctx;
  }
}

module.exports = Service;
