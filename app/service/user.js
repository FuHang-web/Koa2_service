const User = require('../models/user')
class UserService {
  async createUser(username, password) {
    // 插入数据
    // console.log(aaa);
    const res = await User.create({
      // 表的字段：
      username: username,
      password: password
    })
    // console.log(res);
    return res
  }

  async getUserInfo({
    id,
    username,
    password,
    is_admin
  }) {
    const whereOpt = {}
    id && Object.assign(whereOpt, {
      id
    })
    username && Object.assign(whereOpt, {
      username
    })
    password && Object.assign(whereOpt, {
      password
    })
    is_admin && Object.assign(whereOpt, {
      is_admin
    })
    const res = await User.findOne({
      attributes: ['id', 'username', 'password', 'is_admin'],
      where: whereOpt
    })
    if (res) {
      return res.dataValues
    } else {
      return null
    }
  }

  async updateById({id, username, password, id_admin}) {
    const whereOpt = {id}
    const newUser = {}
    username && Object.assign(newUser, {username})
    password && Object.assign(newUser, {password})
    id_admin && Object.assign(newUser, {id_admin})
    const res = await User.update(newUser, {where: whereOpt})
    console.log(res);
    return res[0] > 0 ? true : false
  }
}

module.exports = new UserService()