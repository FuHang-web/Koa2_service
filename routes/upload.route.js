const Router = require('koa-router')

const router = new Router({
  prefix: '/upload'
})
const {
  putStream,
} = require('../middleware/OSSMiddleware')
const {
  auth
} = require('../middleware/auth.middleware')
const { addFiles } = require('../app/controller/file.controller')

router.post('/fileUpload', auth, putStream, addFiles)

module.exports = router