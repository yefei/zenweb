'use strict';

const { Service } = require('../..');
const app = require('../app');

class HelloService extends Service {
  constructor(ctx) {
    super(ctx);
    this.i = 0;
  }

  say() {
    this.i++;
    return `Hello: ${this.ctx.path}, ${this.i}`;
  }
}

app.service.register(HelloService);
