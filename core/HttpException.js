class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 500) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
    this.data = {}
  }
}

class Success extends HttpException {
  constructor(msg, errorCode, data) {
    super()
    this.msg = msg || 'success'
    this.errorCode = errorCode || 0
    this.code = 200
    this.data = data || {}
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '参数错误'
    this.errorCode = errorCode || 10000
    this.code = 400
  }
}

class NotFound extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '资源不存在'
    this.errorCode = errorCode || 10001
    this.code = 404
  }
}

class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '授权失败'
    this.errorCode = errorCode || 10002
    this.code = 401
  }
}

class Forbbiden extends HttpException {
  constructor(msg, errorCode) {
    super()
    this.msg = msg || '禁止访问'
    this.errorCode = errorCode || 10003
    this.code = 403
  }
}

class LikeError extends HttpException {
  constructor(errorCode) {
    super()
    this.msg = '你已经点过赞'
    this.errorCode = errorCode || 60001
    this.code = 400
  }
}

class DislikeError extends HttpException {
  constructor(errorCode) {
    super()
    this.msg = '你已取消点赞'
    this.errorCode = errorCode || 60002
    this.code = 400
  }
}

module.exports = {
  HttpException,
  ParameterException,
  NotFound,
  AuthFailed,
  Forbbiden,
  LikeError,
  DislikeError,
  Success: (options = {}) => {
    const { msg = 'success', errorCode = 0, data = {} } = options
    throw new Success(msg, errorCode, data)
  }
}
