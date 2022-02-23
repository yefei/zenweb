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

项目模块序号用于错误代码分类

### 内置模块
1. [meta](https://www.npmjs.com/package/@zenweb/meta)
2. [log](https://www.npmjs.com/package/@zenweb/log)
3. [router](https://www.npmjs.com/package/@zenweb/router)
4. [messagecode](https://www.npmjs.com/package/@zenweb/messagecode)
5. [body](https://www.npmjs.com/package/@zenweb/body)
6. [service](https://www.npmjs.com/package/@zenweb/service)
7. [api](https://www.npmjs.com/package/@zenweb/api)
8. [helper](https://www.npmjs.com/package/@zenweb/helper)

内置模块默认开启，可以通过设置配置项为 **false** 关闭


### 可选模块
9. [cors](https://www.npmjs.com/package/@zenweb/cors)
10. [sentry](https://www.npmjs.com/package/@zenweb/sentry)
11. [metric](https://www.npmjs.com/package/@zenweb/metric)
12. [validation](https://www.npmjs.com/package/@zenweb/validation)
13. [mysql](https://www.npmjs.com/package/@zenweb/mysql)
14. [orm](https://www.npmjs.com/package/@zenweb/orm)
15. [view](https://www.npmjs.com/package/@zenweb/view)
16. [schedule](https://www.npmjs.com/package/@zenweb/schedule)
17. [form](https://www.npmjs.com/package/@zenweb/form)
