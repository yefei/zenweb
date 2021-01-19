'use strict';

const { Service } = require('../..');

class HelloService extends Service {
  say() {
    return `Hello333: ${this.ctx.path}`;
  }
}

module.exports = HelloService;
