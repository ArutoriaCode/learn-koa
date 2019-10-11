const catchError = require('../middlewares/exception')
const Router = require('koa-router')
const requireDir = require('require-directory')

class InitManager {
  static InitCore (app) {
    InitManager.app = app
    InitManager.InitGlobalCatch() // 注册全局异常处理
    InitManager.InitLoadRoutes() // 注册路由
  }

  static InitGlobalCatch () {
    InitManager.app.use(catchError)
  }

  static InitLoadRoutes () {
    const RoutePath = `${process.cwd()}/app/api`
    requireDir(module, RoutePath, {
      visit: (obj) => {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes())
        }
      }
    })
  }

}

module.exports = InitManager
