class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 10000, code = 500) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code
    this.data = {}
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

class Success extends HttpException {
  constructor(msg, errorCode, data) {
    super()
    this.msg = msg || 'success'
    this.errorCode = errorCode || 0
    this.code = 200
    this.data = data || {}
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success: (msg, errorCode, data) => {
    throw new Success(msg, errorCode, data)
  }
}
