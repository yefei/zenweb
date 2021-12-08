# ZenWeb
Modular lightweight web framework based on Koa

## Quick start

package.json
```json
{
  "name": "app",
  "type": "module",
  "private": true,
  "exports": "app/**",
  "scripts": {
    "dev": "cross-env DEBUG=* NODE_ENV=development nodemon app",
    "start": "node app"
  }
}
```

```bash
$ npm i zenweb cross-env nodemon
```

app/index.js
```js
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

app/controller/hello.js
```js
import { Router } from 'zenweb';
export const router = Router();

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

app/service/hello_service.js
```js
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
```

```bash
$ npm run dev
boot time: 2 ms
server on: 7001
```
