'use strict';

const app = require('../app');

app.router.get('/', ctx => {
  ctx.body = {
    hello: 'world',
    time: Date.now(),
  };
});

app.router.get('/name/:name', ctx => {
  ctx.body = {
    name: ctx.params.name,
  };
});

app.router.get('/error', ctx => {
  // 错误输出终止执行
  ctx.fail('error demo');
  console.log('后续代码不会执行');
});

app.router.get('/log', ctx => {
  ctx.log.info('Hello');
  ctx.body = 'hello';
});
