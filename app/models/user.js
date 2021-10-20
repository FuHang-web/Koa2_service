const {
  Sequelize,
  DataTypes,
  Model
} = require('sequelize')

const sequelize = require('../db')

// 创建模型( Model lc_user => lc_users)
const User = sequelize.define('lc_user', {
  // id 会被 sequelize自动创建
  username: {
    type: DataTypes.STRING,
    allowNull: false, // 字段是否可以为空
    unique: true, // 是否唯一
    comment: '用户名'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '用户密码'
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0, // 默认值
    comment: '是否为管理员（0：不是管理员(默认) ， 1：是管理员）'
  }
})
