const parser = require('koa-bodyparser')
const Router = require('koa-router')
const staticDir = require('koa-static')
const requireDir = require('require-directory')

const catchError = require('../middlewares/exception')

class InitManager {
  static InitCore (app) {
    InitManager.app = app
    InitManager.InitGlobalCatch() // 注册全局异常处理
    InitManager.InitParser() // JSON
    InitManager.InitStaticDir() // 注册静态资源
    InitManager.InitLoadRoutes() // 注册路由
  }

  static InitParser () {
    InitManager.app.use(parser())
  }

  static InitGlobalCatch () {
    InitManager.app.use(catchError)
  }

  static InitStaticDir() {
    const staticPath = `${process.cwd()}/static`
    InitManager.app.use(staticDir(staticPath))
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
