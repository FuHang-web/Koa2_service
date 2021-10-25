const Router = require('koa-router')
const router = new Router({
  prefix: '/menu'
})
const { auth } = require('../middleware/auth.middleware')
const { addMenu, getAllMenus } = require('../app/controller/menu.controller')
router.post('/addMenu', auth, addMenu)
router.get('/getMenuList', auth, getAllMenus)

module.exports = router