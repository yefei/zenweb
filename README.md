# jiango-node
simple web framework

## Quick start

```bash
$ npm i jiango
```

app.js
```js
'use strict';

const app = module.exports = require('..')();
app.start();
```

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
Server on 7001. 2 ms
```

## 环境变量

| 环境变量 | 说明 | 默认 | 例子 |
| ------- | --- | --- | --- |
| PORT | 服务端口 | 7001 | 3000 |
| LOG_FILE | 日志输出文件 | 无。控制台输出 | /tmp/app1.log |
