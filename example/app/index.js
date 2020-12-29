'use strict';

const { router } = require('../..');

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
