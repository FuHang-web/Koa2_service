require('dotenv').config()
const Koa = require('koa')
const KoaBody = require('koa-body')
const InitManager = require('./core/init')
const config = require('./config/config')
const AccessLogMiddleware = require('./middleware/AccessLogMiddleware')

const app = new Koa()
app.use(KoaBody()).use(AccessLogMiddleware)
// 初始化
InitManager.initCore(app)
// app.listen(process.env.APP_PORT, () => {
app.listen(config.app.port, () => {
  console.log(`http://localhost:${config.app.port}`);
})