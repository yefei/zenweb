import { Context, inject, mapping } from '../../../src/index';
import { HelloService } from '../service/hello_service';

export class Index {
  @mapping()
  index() {
    return {
      hello: 'world',
      time: Date.now(),
    };
  }

  @mapping({ path: '/name/:name' })
  name(ctx: Context) {
    return {
      name: ctx.params.name,
    };
  }

  @mapping()
  error(ctx: Context) {
    // 错误输出终止执行
    ctx.fail('error demo');
    console.log('后续代码不会执行');
  }

  @mapping()
  log(ctx: Context) {
    ctx.log.info('Context log');
    return 'hello';
  }

  @inject helloService: HelloService;

  @mapping()
  service() {
    return this.helloService.say();
  }

  @mapping({ path: '/x-process-time' })
  async processTime(ctx: Context) {
    await sleep(1000);
    ctx.body = 'ok';
  }

  @mapping({ method: 'POST' })
  typecast(ctx: Context) {
   return ctx.helper.body({
      kw: 'trim',
      count: 'int',
      is: 'bool',
      list: '!int[]',
      trim: 'trim',
      trimList:'trim[]',
    });
  }

  @mapping({ method: 'POST' })
  post(ctx: Context) {
    return ctx.request.body;
  }

  @mapping({ method: 'POST' })
  file(ctx: Context) {
    console.log('file:', ctx.request.files);
    return ctx.request.body;
  }

  @mapping()
  page(ctx: Context) {
    const page = ctx.helper.page({ allowOrder: ['aaa'] });
    return { page };
  }
}

function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}
