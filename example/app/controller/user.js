import { Router } from 'zenweb';
export const router = new Router({ prefix: '/user' });

// 路由级别的中间件, 只会在当前文件有效
router.use((ctx, next) => {
  ctx.log.info('用户登陆验证');
  return next();
});

router.get('/', ctx => {
  ctx.success('user index');
});

router.get('/profile', ctx => {
  ctx.success('user profile');
});
