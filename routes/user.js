const Router = require('koa-router')
const {
  register,
  login,
  changePassword
} = require('../app/controller/user')
const { auth } = require('../middleware/auth.middleware')
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
// 修改密码
router.patch('/', userValidate, auth, cryptPassword, changePassword)

module.exports = router