import { Context } from "@zenweb/core";
import { inject } from "@zenweb/inject";

export class HelloService {
  @inject
  ctx: Context;

  private i = 0;

  say() {
    this.i++;
    return `Hello: ${this.ctx.path}, ${this.i}`;
  }
}
