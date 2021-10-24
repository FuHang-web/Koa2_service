require('dotenv').config()
const Koa = require('koa')
// const KoaBody = require('koa-body')
const InitManager = require('./utils/init')
const config = require('./config/config')
const {
  // AccessLogger,
  ErrorLogger
} = require('./middleware/LoggerInfoMiddleware')
const {
  errorHandler
} = require('./app/errorHandler')

const app = new Koa()
// app.use(KoaBody()).use(AccessLogger)

// 初始化
InitManager.initCore(app)
app.on('error', async (err, ctx) => {
  errorHandler(err, ctx)
  ErrorLogger(err, ctx)
})
// app.listen(process.env.APP_PORT, () => {
app.listen(config.app.port, () => {
  console.log(`http://localhost:${config.app.port}`);
})