const jwt = require('jsonwebtoken')
const { tokenExpiredError, invalidTokenError } = require('../app/constant/user.type')
const { JWT_SECRET } = require('../config/config').app

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  // console.log(authorization);
  const token = authorization.replace('Bearer ', '')
  // console.log(token);

  try {
    // user中包含了payload的信息
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
    // console.log(ctx.state.user);
  } catch (error) {
    console.log(error.name,'error');
    switch (error.name) {
      case 'TokenExpiredError':
        console.log('token过期');
        ctx.app.emit('error', tokenExpiredError(), ctx)
        break;
      case 'JsonWebTokenError':
        console.log('无效的token');
        ctx.app.emit('error', invalidTokenError(), ctx)
        break
      default:
        break;
    }
    return
  }
  await next()
}

module.exports = {
  auth
}