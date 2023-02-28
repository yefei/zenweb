import { scope } from "@zenweb/inject";

@scope('singleton')
export class HelloService {
  // @inject sec: SecondService; // 无法在单例中注入 request 级别的对象

  private counter = 0;

  constructor() {
    console.log('HelloService init');
  }

  say() {
    return `Hello: ${this.counter++}`;
  }
}
