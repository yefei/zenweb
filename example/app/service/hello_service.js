import { Service } from 'zenweb';

export default class HelloService extends Service {
  constructor(ctx) {
    super(ctx);
    this.i = 0;
  }

  say() {
    this.i++;
    return `Hello: ${this.ctx.path}, ${this.i}`;
  }
}
