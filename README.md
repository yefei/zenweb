# jiango-node
simple web framework

## Quick start

```
npm i jiango
mkdir app
```

app/index.js
```
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
```
'use strict';

const { start } = require('jiango');

start();
```

```
node main.js
```
