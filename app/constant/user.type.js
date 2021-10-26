module.exports = {
  userFormateError(msg, next) {
    return {
      code: '10001',
      message: msg || '用户名或密码为空',
      data: ''
    }
  },
  userAlreadyExited() {
    return {
      code: '10002',
      message: '该用户已经存在',
      data: ''
    }
  },
  userRegisterError() {
    return {
      code: '10003',
      message: '用户注册错误',
      data: ''
    }
  },
  userDoesNotError() {
    return {
      code: '10004',
      message: '用户不存在',
      data: ''
    }
  },
  userLoginError() {
    return {
      code: '10005',
      message: '用户登录失败',
      data: ''
    }
  },
  invalidPasswordError() {
    return {
      code: '10006',
      message: '密码不匹配',
      data: ''
    }
  },
  updatePasswordError() {
    return {
      code: '10007',
      message: '修改密码失败',
      data: ''
    }
  },
  captchaError() {
    return {
      code: '10008',
      message: '验证码不符合',
      data: ''
    }
  },
  tokenExpiredError() {
    return {
      code: '10101',
      message: 'token已过期',
      data: ''
    }
  },
  invalidTokenError() {
    return {
      code: '10102',
      message: '无效的token',
      data: ''
    }
  },
  // 菜单
  addMenuError() {
    return {
      code: '10201',
      message: '新增菜单失败',
      data: ''
    }
  },
}