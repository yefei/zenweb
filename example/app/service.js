'use strict';

const Service = require('../../lib/service');

class HelloService extends Service {
  say() {
    return `Hello: ${this.ctx.path}`;
  }
}

module.exports = HelloService;
