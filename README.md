# jiango-node
simple web framework

## Quick start

```bash
$ npm i jiango
```

app/index.js
```js
'use strict';

const { router } = require('jiango');

router.get('/', ctx => {
  ctx.body = {
    hello: 'world',
    time: Date.now(),
  };
});
```

main.js
```js
'use strict';

const { start } = require('jiango');

start();
```

```bash
$ node main.js
Router: HEAD,GET /
Server on 7001. 2 ms
```

## 环境变量

| 环境变量 | 说明 | 默认 | 例子 |
| ------- | --- | --- | --- |
| PORT | 服务端口 | 7001 | 3000 |
| LOG_FILE | 日志输出文件 | 无。控制台输出 | /tmp/app1.log |
| SENTRY_DSN | Sentry 服务地址 | 无 | https://xxxxxx |
