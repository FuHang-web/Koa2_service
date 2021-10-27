const session = require('koa-session')
const requireDirectory = require('require-directory')
const Router = require('koa-router')
const KoaBody = require('koa-body')
const {
  AccessLogger,
} = require('../middleware/LoggerInfoMiddleware')
// const OSS = require('ali-oss')
class InitManager {
  static async initCore(app) {
    //入口方法
    InitManager.app = app
    InitManager.initUses()
    InitManager.initLoadRouters()
    InitManager.initSessions()
    // InitManager.initAliOss()
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
    console.log(process.cwd());
    InitManager.app.use(KoaBody({
      multipart: true,
      // formidable: {
      //   uploadDir: `${process.cwd()}/upload/test`,
      //   keepExtensions: true
      // }
    })).use(AccessLogger)
  }

  static initSessions() {
    InitManager.app.keys = ['some secret hurr']; // 这个是配合signed属性的签名key
    const CONFIG = {
      key: 'koa.sess',
      /** (string) cookie key (default is koa.sess) */
      /** (number || 'session') maxAge in ms (default is 1 days) */
      /** 'session' will result in a cookie that expires when session/browser is closed */
      /** Warning: If a session cookie is stolen, this cookie will never expire */
      maxAge: 86400000,
      autoCommit: true,
      /** (boolean) automatically commit headers (default true) */
      overwrite: true,
      /** (boolean) can overwrite or not (default true) */
      httpOnly: true,
      /** (boolean) httpOnly or not (default true) */
      signed: true,
      /** (boolean) signed or not (default true) */
      rolling: false,
      /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
      renew: false,
      /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
      secure: false,
      /** (boolean) secure cookie*/
      sameSite: null,
      /** (string) session cookie sameSite options (default null, don't set it) */
    };
    InitManager.app.use(session(CONFIG, InitManager.app))
  }

  static initAliOss() {
    let client = new OSS({
      // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
      region: 'oss-cn-chengdu',
      // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
      accessKeyId: 'LTAI5tD9h5qMvMJxML2NDCEx',
      accessKeySecret: 'Gf3spX0IGKcyhJX65zYUicbu9utjsp',
      // 填写Bucket名称。
      bucket: 'fu-cloud'
    });
    async function listBuckets() {
      try {
        let result = await client.listBuckets();
        console.log(result);
      } catch (err) {
        console.log(err)
      }
    }
    listBuckets()
  }
}

module.exports = InitManager