# ZenWeb
Modular lightweight web framework based on Koa

## Quick start

```bash
$ npm i zenweb
```

app.js
```js
'use strict';

const app = module.exports = require('zenweb').create();

// add module
// $ npm i @zenweb/sentry @zenweb/cors @zenweb/validation
app.setup('@zenweb/sentry', { dsn: 'xxxxx' });
app.setup('@zenweb/cors', { origin: '*' });
app.setup('@zenweb/validation');

app.router.get('/hello', ctx => {
  ctx.success('Hello');
});

app.router.get('/error', ctx => {
  ctx.fail('error info');
  console.log('Will not output');
});

app.start();
```

```bash
$ node app
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
