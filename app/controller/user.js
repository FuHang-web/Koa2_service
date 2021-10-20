const {
  createUser
} = require('../service/user')
class UserController {
  // 注册
  async register(ctx, next) {
    // 1. 获取数据
    // console.log(ctx.request.body);
    const {
      username,
      password
    } = ctx.request.body
    // 2. 操作数据库
    const res = await createUser(username, password)
    // console.log(res);
    // 3. 返回结果
    ctx.body = ctx.request.body
  }

  // 登录
  async login(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new UserController()