const { HttpException } = require('../core/HttpException')
const { env } = require('../config/config')

const catchError = async (ctx, next) => {
  const request = `${ctx.method} ${ctx.path}`
  try {
    await next()
  } catch (error) {
    // console.log(error)
    const isHttpException = error instanceof HttpException
    const isDev = env === 'dev'

    if (isDev && !isHttpException) {
      throw error
    }

    if (isHttpException) {
      ctx.body = {
        msg: error.msg,
        error_code: error.errorCode,
        request
      }
      ctx.status = error.code
    } else {
      const logger = require('../utils/logger')
      logger.error(error) // 生产环境记录未知错误的日志
      ctx.body = {
        msg: '服务器出现了点问题!',
        error_code: 999,
        request
      }
      ctx.status = 500
    }
  }
}

module.exports = catchError