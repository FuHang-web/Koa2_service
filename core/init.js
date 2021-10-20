const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore(app) {
    //入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
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
}

module.exports = InitManager