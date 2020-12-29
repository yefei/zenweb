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
