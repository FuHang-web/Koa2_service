const Router = require('koa-router')

const router = new Router({prefix: '/admin'})

router.get('/', (ctx, next) => {
  ctx.body = '1'
})

router.get('/one', (ctx, next) => {
  ctx.body = '2'
})

router.get('/two', (ctx, next) => {
  ctx.body = '3'
})

module.exports = router