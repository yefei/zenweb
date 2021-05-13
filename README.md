# ZenWeb
Modular lightweight web framework based on Koa

## Quick start

```bash
$ npm i zenweb
```

app/index.js
```js
'use strict';

const app = module.exports = require('zenweb').create({
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
'use strict';

const app = require('..');
const router = app.router;

app.router.get('/', ctx => {
  ctx.success('Hello');
});

app.router.get('/hello', ctx => {
  ctx.success({
    say1: ctx.service.helloService.say(),
    say2: ctx.service.helloService.say(),
    say3: ctx.service.helloService.say(),
  });
});

app.router.get('/error', ctx => {
  ctx.fail('error info');
  console.log('Will not output');
});
```

app/service/hello_service.js
```js
'use strict';

const { Service } = require('zenweb');

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

module.exports = HelloService;
```

```bash
$ DEBUG=* node app
boot time: 2 ms
server on: 7001
```

## doc

### ctx.helper
#### query(), body(), params()
```js
ctx.body = ctx.helper.query('kw', {
  count: 'int',
  is: 'bool',
  list:'int[]',
  trim:'trim',
  trimList:'trim[]',
});
```
```bash
curl --location --request GET '127.0.0.1:7001/typecast?kw=%20111%20&count=222&is=y&list=1,2,3&trim=%20%20aaaa%20&trimList=asd,sdd,%20%20ddd%20,d,,1'
```
```json
{
  "kw": " 111 ",
  "count": 222,
  "is": true,
  "list": [
    1,
    2,
    3
  ],
  "trim": "aaaa",
  "trimList": [
    "asd",
    "sdd",
    "ddd",
    "d",
    "1"
  ]
}
```
