const {
  Sequelize
} = require('sequelize')
require('dotenv').config()
const {
  dbLogger
} = require('../../logger/logs')
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../../config/config').database
// console.log(config);

const sequelize = new Sequelize(dbName, user, password, {
  host: host,
  dialect: 'mysql',
  port: port,
  timezone: '+08:00',
  logging: (msg) => dbLogger.info("sql", msg),
  define: {
    //create_time  update_time delete_time
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
    freezeTableName: true
  }
});

sequelize.sync({
  force:true
})

// sequelize.authenticate().then(() => {
//   console.log('连接成功');
// }).catch(err => {
//   console.log(err);
// })
module.exports = sequelize