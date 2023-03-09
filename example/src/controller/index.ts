import { BodyHelper, Body } from '@zenweb/body';
import { QueryHelper } from '@zenweb/helper';
import { Context, inject, mapping } from '../../../src/index';
import { HelloService } from '../service/hello_service';
import { SecondService } from '../service/second_service';

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
  service(sec: SecondService) {
    sec.getNow();
    return this.helloService.say();
  }

  @mapping({ path: '/x-process-time' })
  async processTime(ctx: Context) {
    await sleep(1000);
    ctx.body = 'ok';
  }

  @mapping({ method: 'POST' })
  typecast(body: BodyHelper) {
   return body.get({
      kw: 'trim',
      count: 'int',
      is: 'bool',
      list: '!int[]',
      trim: 'trim',
      trimList:'trim[]',
    });
  }

  @mapping({ method: 'POST' })
  post(body: Body) {
    return body.data;
  }

  @mapping()
  page(query: QueryHelper) {
    const page = query.page({ allowOrder: ['aaa'] });
    return { page };
  }
}

function sleep(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}
