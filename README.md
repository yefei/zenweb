# ZenWeb
Koa based modular web framework

## Quick start

```bash
$ npm i zenweb
```

app.js
```js
'use strict';

const app = module.exports = require('zenweb')();

// 安装其他模块
// $ npm i @zenweb/sentry
// app.setup('@zenweb/sentry', { dsn: 'xxxxx' });

app.start();
```

代码直接写到 app/ 目录下，项目启动时自动加载 app/ 目录下的所有文件。

app/index.js
```js
'use strict';

const app = require('../app');
const router = app.router;

router.get('/', ctx => {
  ctx.body = {
    hello: 'world',
    time: Date.now(),
  };
});
```

```bash
$ node app
boot time: 2 ms
server on: 7001
```

## 环境变量

| 环境变量 | 说明 | 默认 | 例子 |
| ------- | --- | --- | --- |
| PORT | 服务端口 | 7001 | 3000 |
| LOG_FILE | 日志输出文件 | 无。控制台输出 | /tmp/app1.log |

## 功能说明

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
