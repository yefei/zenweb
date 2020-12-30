'use strict';

const { router, fail } = require('../..');

router.get('/', ctx => {
  ctx.body = {
    hello: 'world',
    time: Date.now(),
  };
});

router.get('/name/:name', ctx => {
  ctx.body = {
    name: ctx.params.name,
  };
});

router.get('/error', ctx => {
  // 错误输出终止执行
  fail('error demo');
  console.log('后续代码不会执行');
});
