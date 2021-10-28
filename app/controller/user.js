const jwt = require('jsonwebtoken')
const {
  createUser,
  getUserInfo,
  updateById,
  getUserInfoById,
  getUserPage
} = require('../service/user')
const {
  userRegisterError,
  updatePasswordError,
  // captchaError
} = require('../constant/user.type')

const {
  JWT_SECRET
} = require('../../config/config').app
class UserController {
  // 注册
  async register(ctx, next) {
    // console.log(ctx.request.body);
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
        message: '注册成功',
        data: {
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
      username,
      // captcha
    } = ctx.request.body
    // console.log(ctx.request.ip);
    // ctx.body = `欢迎回来 ${username}`
    // 1、获取用户信息（在token的playload中，记录id，username,password）
    // console.log(captcha);
    // if (captcha !== ctx.session.code) {
    //   return ctx.body = captchaError()
    // }
    try {
      const {
        password,
        ...res
      } = await getUserInfo({
        username
      })
      // console.log(res);
      // ctx.state.user = res
      // console.log(ctx.state.user);
      ctx.body = {
        code: 200,
        message: '用户登录成功',
        data: Object.assign(res, {
          token: jwt.sign(res, JWT_SECRET, {
            // 1000 毫秒 1秒
            expiresIn: '1d'
          }),
        })
      }
    } catch (error) {
      console.log('登录失败');
    }
  }

  async getUserInfoData(ctx, next) {
    try {
      const {
        id
      } = ctx.request.body
      const res = await getUserInfoById({
        id
      })
      // console.log(res,'95555555555555555');
      // ctx.state.user = res
      ctx.body = {
        code: 200,
        message: '成功',
        data: res
      }
    } catch (error) {
      console.log('null');
    }
  }

  async getUserInfoPage(ctx, next) {
    try {
      const query = JSON.parse(JSON.stringify(ctx.request.query))
      const res = await getUserPage(query)
      ctx.body = {
        code: 200,
        message: 'success',
        data: res
      }
    } catch (error) {
      
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
        message: '修改成功',
        data: {
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