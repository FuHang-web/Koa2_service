const {
  Sequelize,
  DataTypes,
  Model
} = require('sequelize')

const sequelize = require('../db')

const User = sequelize.define('lc_menu', {
  // id 会被 sequelize自动创建
  name: {
    type: DataTypes.STRING(32),
    allowNull: false, // 字段是否可以为空
    // unique: true, // 是否唯一
    comment: '菜单名称'
  },
  permission: {
    type: DataTypes.STRING(32),
    allowNull: false, // 字段是否可以为空
    // unique: true, // 是否唯一
    comment: '菜单权限标识'
  },
  parent_id: {
    type: DataTypes.INTEGER(11),
    allowNull: false, // 字段是否可以为空
    // unique: true, // 是否唯一
    comment: '父级菜单id'
  },
  path: {
    type: DataTypes.STRING(128),
    allowNull: false, // 字段是否可以为空
    // unique: true, // 是否唯一
    comment: '前端URL'
  },
  component: {
    type: DataTypes.STRING(500),
    allowNull: false, // 字段是否可以为空
    // unique: true, // 是否唯一
    comment: 'VUE页面路径'
  },
  icon: {
    type: DataTypes.STRING(32),
    // allowNull: false, // 字段是否可以为空
    // unique: true, // 是否唯一
    comment: '菜单图标'
  },
  sort: {
    type: DataTypes.INTEGER(11),
    // allowNull: false, // 字段是否可以为空
    // unique: true, // 是否唯一
    comment: '排序'
  },
  type: {
    type: DataTypes.INTEGER(1),
    // allowNull: false, // 字段是否可以为空
    // unique: true, // 是否唯一
    defaultValue: 0, // 默认值
    comment: '菜单类型（0 菜单 1按钮）'
  },
  keep_alive: {
    type: DataTypes.INTEGER(1),
    // allowNull: false, // 字段是否可以为空
    // unique: true, // 是否唯一
    defaultValue: 0, // 默认值
    comment: '路由缓冲（0：开启 1关闭）'
  },
})

// User.sync({
//   force: true
// })

module.exports = User