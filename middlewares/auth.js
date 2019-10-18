const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

const { security } = require('../config/config')
const { Forbbiden } = require('../core/HttpException')

class Auth {

  constructor(level) {
    this.level = level
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get verify() {
    return async (ctx, next) => {
      let errMsg = 'token不合法'
      
      const userToken = basicAuth(ctx.req)
      
      if (!userToken || !userToken.name) throw new Forbbiden(errMsg)
      
      try {
        var decode = jwt.verify(userToken.name, security.secretKey)
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        throw new Forbbiden(errMsg)
      }

      if (decode.scope < this.level) {
        throw new Forbbiden('权限不足')
      }

      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }

      await next()

    }
  }

}

module.exports = Auth
