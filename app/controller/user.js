const jwt = require('jsonwebtoken')
const {
  createUser,
  getUserInfo,
  updateById
} = require('../service/user')
const {
  userRegisterError,
  updatePasswordError
} = require('../constant/user.type')

const {
  JWT_SECRET
} = require('../../config/config').app
class UserController {
  // 注册
  async register(ctx, next) {

    // 1. 获取数据
    const {
      username,
      password
    } = ctx.request.body

    // 2. 操作数据库
    try {
      const {
        dataValues: res
      } = await createUser(username, password)

      // 3. 返回结果
      ctx.body = {
        code: 0,
        msg: '注册成功',
        result: {
          id: res.id,
          username: res.username,
          password: res.password
        }
      }
    } catch (error) {
      console.log(error);
      ctx.app.emit('error', userRegisterError(), ctx)
    }
  }

  // 登录
  async login(ctx, next) {
    const {
      username
    } = ctx.request.body
    // console.log(ctx.request.ip);
    // ctx.body = `欢迎回来 ${username}`
    // 1、获取用户信息（在token的playload中，记录id，username,password）
    try {
      const {
        password,
        ...res
      } = await getUserInfo({
        username
      })
      ctx.state.user = res
      // console.log(ctx.state.user);
      ctx.body = {
        code: 0,
        msg: '用户登录成功',
        result: {
          // 1000 毫秒 1秒
          token: jwt.sign(res, JWT_SECRET, {
            expiresIn: '1d'
          })
        }
      }
    } catch (error) {
      console.log('登录失败');
    }
  }

  // 
  async changePassword(ctx, next) {
    // 1、获取数据
    const id = ctx.state.user.id
    // const password = ctx.request.body.password
    // const password = ctx.request.body.password
    console.log(ctx.request.body);
    // 2、操作数据库
    // if (await updateById({
    //     id,
    //     username,
    //     password
    //   })) {
    //   ctx.body = {
    //     code: 0,
    //     msg: '修改成功',
    //     result: ''
    //   }
    // }

    try {
      await updateById({
        id,
        ...ctx.request.body
      })
      ctx.body = {
        code: 0,
        msg: '修改成功',
        result: {
          username: ctx.request.body.username
        }
      }
    } catch (error) {
      ctx.app.emit('error', updatePasswordError(), ctx)
    }
    // 3、返回结果
  }
}

module.exports = new UserController()