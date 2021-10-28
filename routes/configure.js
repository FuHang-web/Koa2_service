const Router = require('koa-router')
const router = new Router({
  prefix: '/configure'
})
const {
  auth
} = require('../middleware/auth.middleware')
const {
  ossConfigure
} = require('../app/controller/configure')
router.get('/', auth, ossConfigure)

module.exports = router