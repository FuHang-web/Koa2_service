const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize')

const sequelize = require('../db')


// 创建模型( Model lc_user => lc_users)
const OSS = sequelize.define('oss_configure', {
    region: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'oss-cn-chengdu', // 默认值
        comment: ''
    },
    access_key_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'LTAI5tD9h5qMvMJxML2NDCEx', // 默认值
        comment: ''
    },
    access_key_secret: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'Gf3spX0IGKcyhJX65zYUicbu9utjsp', // 默认值
        comment: ''
    },
    bucket: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: 'fu-cloud', // 默认值
        comment: 'Bucket名称'
    },
})

// OSS.sync({
//     force: true
// })

module.exports = {
    OSS
}