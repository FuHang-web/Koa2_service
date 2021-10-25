const session = require('koa-session')
const requireDirectory = require('require-directory')
const Router = require('koa-router')
const KoaBody = require('koa-body')
const {
  AccessLogger,
} = require('../middleware/LoggerInfoMiddleware')
class InitManager {
  static initCore(app) {
    //入口方法
    InitManager.app = app
    InitManager.initUses()
    InitManager.initLoadRouters()
    InitManager.initSessions()
  }

  static initLoadRouters() {
    //path config
    const apiDirectory = `${process.cwd()}/routes`
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes(), obj.allowedMethods())
      }
    }
  }
  
  static initUses() {
    InitManager.app.use(KoaBody()).use(AccessLogger)
  }

  static initSessions() {
    InitManager.app.keys = ['some secret hurr'];  // 这个是配合signed属性的签名key
    const CONFIG = {
      key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
      /** (number || 'session') maxAge in ms (default is 1 days) */
      /** 'session' will result in a cookie that expires when session/browser is closed */
      /** Warning: If a session cookie is stolen, this cookie will never expire */
      maxAge: 86400000,
      autoCommit: true, /** (boolean) automatically commit headers (default true) */
      overwrite: true, /** (boolean) can overwrite or not (default true) */
      httpOnly: true, /** (boolean) httpOnly or not (default true) */
      signed: true, /** (boolean) signed or not (default true) */
      rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
      renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
      secure: false, /** (boolean) secure cookie*/
      sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
    };
    InitManager.app.use(session(CONFIG, InitManager.app))
  }
}

module.exports = InitManager