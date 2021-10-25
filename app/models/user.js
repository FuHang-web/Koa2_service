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
      type: DataTypes.STRING(64),
      allowNull: false, // 字段是否可以为空
      unique: true, // 是否唯一
      comment: '用户名'
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: '用户密码'
    },
    phone: {
      type: DataTypes.STRING(20),
      // allowNull: false,
      // defaultValue: 0, // 默认值
      comment: '手机号'
    },
    card_number: {
      type: DataTypes.STRING(20),
      // allowNull: false,
      // defaultValue: 0, // 默认值
      comment: '身份证号'
    },
    nick_name: {
      type: DataTypes.STRING(50),
      // allowNull: false,
      // defaultValue: 0, // 默认值
      comment: '微信昵称'
    },
    real_name: {
      type: DataTypes.STRING(64),
      // allowNull: false,
      // defaultValue: 0, // 默认值
      comment: '真实姓名'
    },
    sex: {
      type: DataTypes.INTEGER(4),
      // allowNull: false,
      // defaultValue: 0, // 默认值
      comment: '性别（0：女 1：男）'
    },
    avatar_url: {
      type: DataTypes.STRING,
      // allowNull: false,
      // defaultValue: 0, // 默认值
      comment: '头像'
    },
    dept_id: {
      type: DataTypes.STRING,
      // allowNull: false,
      // defaultValue: 0, // 默认值
      comment: '部门id'
    },
    user_attribute: {
      type: DataTypes.STRING(10),
      // allowNull: false,
      // defaultValue: 0, // 默认值
      comment: '用户类型'
    },
    create_by: {
      type: DataTypes.STRING(10),
      // allowNull: false,
      // defaultValue: 0, // 默认值
      comment: '创建者'
    },
    update_by: {
      type: DataTypes.STRING(10),
      // allowNull: false,
      // defaultValue: 0, // 默认值
      comment: '修改人'
    },
    account_status: {
      type: DataTypes.CHAR(1),
      // allowNull: false,
      defaultValue: 0, // 默认值
      comment: '账号状态（0：正常 9：锁定）'
    },
    approval_status: {
      type: DataTypes.TINYINT(1),
      // allowNull: false,
      // defaultValue: 0, // 默认值
      comment: '审核状态（0：待审核 1：审核通过 2：审核不通过）'
    },
  }
  // , {
  //   timestamps: false
  // }
)

// User.sync({
//   force: true
// })

module.exports = User