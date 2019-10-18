const Router = require('koa-router')

const User = require('../../models/user')
const { TokenValidator } = require('../../validators/validator')
const { LoginType } = require('../../libs/enum')
const { ParameterException, Success } = require('@errors')
const { generateToken } = require('../../../core/util')
const Auth = require('../../../middlewares/auth')

api = new Router({
  prefix: '/v1/token'
})

api.post('/', async ctx => {
  const v = await new TokenValidator().validate(ctx)
  const { type, account, password } = v.get('body')
  
  let token
  switch (type) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(account, password)
      break
    case LoginType.USER_MINI_PROGRAM:
      break
    case LoginType.ADMIN_EMAIL:
      break
    default:
      throw new ParameterException('没有相应的处理函数。')
  }

  Success({
    data: { token }
  })
})

async function emailLogin(account, password) {
  const user = await User.verifyEmailPassword(account, password)
  return generateToken(user.id, Auth.USER)
}

async function wxLogin(code) {

}

module.exports = api
