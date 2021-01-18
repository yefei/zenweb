'use strict';

const app = require('../app');
const router = app.router;

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
  ctx.fail('error demo');
  console.log('后续代码不会执行');
});

router.get('/success', ctx => {
  // 使用 success 统一包装返回格式
  ctx.success('ok');
});

router.get('/log', ctx => {
  app.log.info('App log');
  ctx.log.info('Context log');
  ctx.body = 'hello';
});

router.get('/service', ctx => {
  const { helloService } = ctx.service;
  ctx.body = helloService.say();
});
