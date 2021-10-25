module.exports = {
  userFormateError(msg, next) {
    return {
      code: '10001',
      msg: msg || '用户名或密码为空',
      result: ''
    }
  },
  userAlreadyExited() {
    return {
      code: '10002',
      msg: '该用户已经存在',
      result: ''
    }
  },
  userRegisterError() {
    return {
      code: '10003',
      msg: '用户注册错误',
      result: ''
    }
  },
  userDoesNotError() {
    return {
      code: '10004',
      msg: '用户不存在',
      result: ''
    }
  },
  userLoginError() {
    return {
      code: '10005',
      msg: '用户登录失败',
      result: ''
    }
  },
  invalidPasswordError() {
    return {
      code: '10006',
      msg: '密码不匹配',
      result: ''
    }
  },
  updatePasswordError() {
    return {
      code: '10007',
      msg: '修改密码失败',
      result: ''
    }
  },
  captchaError() {
    return {
      code: '10008',
      msg: '验证码不符合',
      result: ''
    }
  },
  tokenExpiredError() {
    return {
      code: '10101',
      msg: 'token已过期',
      result: ''
    }
  },
  invalidTokenError() {
    return {
      code: '10102',
      msg: '无效的token',
      result: ''
    }
  },
  // 菜单
  addMenuError() {
    return {
      code: '10201',
      msg: '新增菜单失败',
      result: ''
    }
  },
}