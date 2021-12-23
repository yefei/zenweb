# ZenWeb
基于 Koa 的模块化轻量级 Web 开发框架。
本框架全部由 typescript 编写

## 快速开始

推荐使用 typescript 创建项目

package.json
```json
{
  "name": "app",
  "private": true,
  "main": "app/index.js",
  "scripts": {
    "dev": "cross-env DEBUG=* NODE_ENV=development nodemon app.ts",
    "build": "tsc",
    "start": "node app"
  },
  "nodemonConfig": {
    "ignore": [
      "**/typings/**"
    ]
  }
}
```

```bash
$ npm i zenweb
$ npm i cross-env nodemon -D
```

app/index.ts
```ts
import { create } from 'zenweb';

const app = create({
  // add optional module
  // $ npm i @zenweb/sentry @zenweb/cors @zenweb/validation
  sentry: { dsn: 'xxxxx' },
  cors: { origin: '*' },
  validation: {},
});

app.start();
```

app/controller/hello.ts
```ts
import { Router } from 'zenweb';
export const router = new Router();

router.get('/', ctx => {
  ctx.success('Hello');
});

router.get('/hello', ctx => {
  ctx.success({
    say1: ctx.service.helloService.say(),
    say2: ctx.service.helloService.say(),
    say3: ctx.service.helloService.say(),
  });
});

router.get('/error', ctx => {
  ctx.fail('error info');
  console.log('Will not output');
});
```

app/service/hello_service.ts
```js
import { Service } from 'zenweb';

export default class HelloService extends Service {
  i = 0;
  say() {
    this.i++;
    return `Hello: ${this.ctx.path}, ${this.i}`;
  }
}
```

```bash
$ npm run dev
boot time: 2 ms
server on: 7001
```

### 内置模块
- [meta](https://www.npmjs.com/package/@zenweb/meta)
- [log](https://www.npmjs.com/package/@zenweb/log)
- [router](https://www.npmjs.com/package/@zenweb/router)
- [messagecode](https://www.npmjs.com/package/@zenweb/messagecode)
- [body](https://www.npmjs.com/package/@zenweb/body)
- [service](https://www.npmjs.com/package/@zenweb/service)
- [api](https://www.npmjs.com/package/@zenweb/api)
- [helper](https://www.npmjs.com/package/@zenweb/helper)

内置模块默认开启，可以通过设置配置项为 **false** 关闭


### 可选模块
- [cors](https://www.npmjs.com/package/@zenweb/cors)
- [sentry](https://www.npmjs.com/package/@zenweb/sentry)
- [metric](https://www.npmjs.com/package/@zenweb/metric)
- [validation](https://www.npmjs.com/package/@zenweb/validation)
- [mysql](https://www.npmjs.com/package/@zenweb/mysql)
- [orm](https://www.npmjs.com/package/@zenweb/orm)
- [view](https://www.npmjs.com/package/@zenweb/view)
- [schedule](https://www.npmjs.com/package/@zenweb/schedule)
- [form](https://www.npmjs.com/package/@zenweb/form)
