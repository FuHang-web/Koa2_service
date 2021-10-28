const User = require('../models/user')
const Op = require('sequelize').Op
class UserService {
  async createUser(username, password) {
    // console.log(username, password);
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

  async getUserPage(params) {
    console.log(params);
    const page = Number(params.current) || 1,
      page_size = Number(params.size) || 10,
      whereOpt = {
        username: {
          [Op.like]: '%' + username + '%'
        }
      }
      console.log(whereOpt);
    const res = await User.findAndCountAll({
      where: whereOpt,
      order: [
        ['created_at', 'DESC']
      ], //倒序
      //分页
      limit: page_size,
      offset: page_size * (page - 1),
    });
    return res
  }

  async getUserInfo({
    id,
    username,
    password,
    phone
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
    phone && Object.assign(whereOpt, {
      phone
    })
    const res = await User.findOne({
      // attributes: ['id', 'username', 'password', 'phone'],
      where: whereOpt
    })
    if (res) {
      return res.dataValues
    } else {
      return null
    }
  }

  async getUserInfoById({
    id
  }) {
    const whereOpt = {}
    id && Object.assign(whereOpt, {
      id
    })
    const res = await User.findOne({
      where: whereOpt
    })
    if (res) {
      return res.dataValues
    } else {
      return null
    }
  }

  async updateById({
    id,
    username,
    password,
    id_admin
  }) {
    const whereOpt = {
      id
    }
    const newUser = {}
    username && Object.assign(newUser, {
      username
    })
    password && Object.assign(newUser, {
      password
    })
    id_admin && Object.assign(newUser, {
      id_admin
    })
    const res = await User.update(newUser, {
      where: whereOpt
    })
    console.log(res);
    return res[0] > 0 ? true : false
  }
}

module.exports = new UserService()