const Router = require('koa-router')
const router = new Router({
  prefix: '/menu'
})
const {
  auth
} = require('../middleware/auth.middleware')
const {
  addMenu,
  getAllMenus,
  getMenuDataPage
} = require('../app/controller/menu.controller')
router.post('/addMenu', auth, addMenu)
router.get('/getMenuList', auth, getAllMenus)
router.get('/getPage', auth, getMenuDataPage)

module.exports = router