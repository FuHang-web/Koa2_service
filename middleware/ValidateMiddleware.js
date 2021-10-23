const Joi = require('joi')
const bcrypt = require('bcryptjs')
const {
  getUserInfo
} = require('../app/service/user')
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotError,
  userLoginError,
  invalidPasswordError
} = require('../app/constant/user.type')

//验证用户信息
const userValidate = async (ctx, next) => {
  // console.log(ctx.request.body);
  //定义对象的验证规则
  const schema = Joi.object({
    username: Joi.string(),
    // username: Joi.string().min(3).required().error(new Error('用户名不符合验证规则')),
    password: Joi.string().regex(/(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}$/).required().error(new Error('密码必须包含字母、数字，且密码位数在8-32位之间')),
  }).unknown();
  const result = schema.validate(ctx.request.body);
  console.log(result);
  if (result.error) {
    ctx.app.emit('error', userFormateError(result.error.message), ctx)
    return result.error
  }
  await next()
};

const verifyUser = async (ctx, next) => {
  const {
    username
  } = ctx.request.body
  try {
    const res = await getUserInfo({
      username
    })
    if (res) {
      console.error('用户名已经存在', {
        username
      });
      ctx.app.emit('error', userAlreadyExited(), ctx)
      return
    }
  } catch (error) {
    ctx.app.emit('error', userRegisterError(), ctx)
    return
  }

  await next()
}

const cryptPassword = async (ctx, next) => {
  const {
    password
  } = ctx.request.body
  const salt = bcrypt.genSaltSync(10);
  // hash 保存的是密文
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash

  await next()
}

const verifyLogin = async (ctx, next) => {
  // 1、判断用户是否存在（不存在：报错）
  const {
    username,
    password
  } = ctx.request.body

  try {
    const res = await getUserInfo({
      username
    })
    if (!res) {
      ctx.app.emit('error', userDoesNotError(), ctx)
      return
    }
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPasswordError(), ctx)
      return
    }
  } catch (error) {
    return ctx.app.emit('error', userLoginError(), ctx)
  }


  // 2、用户密码是否匹配（不匹配：报错）

  await next()
}

module.exports = {
  // 注册
  userValidate,
  verifyUser,
  cryptPassword,
  // 登录
  verifyLogin
}