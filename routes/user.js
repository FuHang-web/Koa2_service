const Router = require('koa-router')
const {
  register,
  login,
  changePassword,
  getUserInfoData,
  getUserInfoPage
} = require('../app/controller/user')
const {
  auth
} = require('../middleware/auth.middleware')
const {
  userValidate,
  verifyUser,
  cryptPassword,
  verifyLogin
} = require('../middleware/ValidateMiddleware')


const router = new Router({
  prefix: '/user'
})

router.post('/register', userValidate, verifyUser, cryptPassword, register)
router.post('/login', verifyLogin, login)

// 获取用户数据
router.post('/getUserInfo', auth, getUserInfoData)
router.get('/getPage', auth, getUserInfoPage)
// 修改密码
router.patch('/', userValidate, auth, verifyUser, cryptPassword, changePassword)

module.exports = router