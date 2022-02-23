import { Service } from '../../../src/index';

export default class HelloService extends Service {
  private i = 0;

  say() {
    this.i++;
    return `Hello: ${this.ctx.path}, ${this.i}`;
  }
}
