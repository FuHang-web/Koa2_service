const {
  Sequelize,
  DataTypes,
  Model
} = require('sequelize')

const sequelize = require('../db')

// 创建模型( Model lc_user => lc_users)
const Files = sequelize.define('lc_files', {
  file_id: {
    type: DataTypes.STRING(30),
    // allowNull: false,
    // defaultValue: 0, // 默认值
    comment: 'nanoId'
  },
  file_name: {
    type: DataTypes.STRING(100),
    // allowNull: false,
    // defaultValue: 0, // 默认值
    comment: '文件名称'
  },
  url: {
    type: DataTypes.STRING(1000),
    // allowNull: false,
    // defaultValue: 0, // 默认值
    comment: '文件路径'
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
})

Files.sync({
  force: true
})

module.exports = Files