import { Context } from "@zenweb/core";
import { inject } from "@zenweb/inject";

export class SecondService {
  @inject ctx!: Context;

  getNow() {
    console.log('req:', this.ctx.path);
    return Date.now();
  }
}
