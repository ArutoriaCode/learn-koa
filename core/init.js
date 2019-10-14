const parser = require('koa-bodyparser')
const Router = require('koa-router')
const requireDir = require('require-directory')

const catchError = require('../middlewares/exception')

class InitManager {
  static InitCore (app) {
    InitManager.app = app
    InitManager.InitGlobalCatch() // 注册全局异常处理
    InitManager.InitParser() // JSON
    InitManager.InitLoadRoutes() // 注册路由
  }

  static InitParser () {
    InitManager.app.use(parser())
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
