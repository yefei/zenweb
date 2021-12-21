import { Router } from '../../../src/index';
export const router = new Router();

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
  ctx.log.info('Context log');
  ctx.body = 'hello';
});

router.get('/service', ctx => {
  console.log( 'helloService' in ctx.service ); // 可以用 in 判断 service 是否已注册
  const helloService = ctx.service.helloService; // 获取时会被初始化
  const helloService2 = ctx.service.helloService; // 再次获取使用之前已经初始化的
  const { helloService: s3 } = ctx.service; // 可以用解构
  ctx.body = {
    1: helloService.say(),
    2: helloService2.say(),
    3: s3.say(),
  };
});

function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

router.get('/x-process-time', async ctx => {
  await sleep(1000);
  ctx.body = 'ok';
});

router.post('/typecast', ctx => {
  ctx.body = ctx.helper.body('kw', {
    count: 'int',
    is: 'bool',
    list: 'int[]',
    trim: 'trim',
    trimList: 'trim[]',
  });
});

router.post('/post', ctx => {
  ctx.body = ctx.request.body;
});

router.post('/file', ctx => {
  console.log('file:', ctx.request.files);
  ctx.body = ctx.request.body;
});
