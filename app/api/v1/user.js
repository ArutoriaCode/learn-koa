const bcrypt = require('bcryptjs')
const Router = require('koa-router')

const { ReisgterValidator } = require('../../validators/validator')
const User = require('../../models/user')

api = new Router({
  prefix: '/v1/user'
})

api.post('/register', async ctx => {
  const v = await new ReisgterValidator().validate(ctx)
  const salt = bcrypt.genSaltSync(10)
  const psw = bcrypt.hashSync(v.get('body.password1'), salt)
  const user = {
    email: v.get('body.email'),
    password: psw,
    nickname: v.get('body.nickname')
  }
  User.create(user)
  ctx.body = {
    message: '成功！'
  }
})

module.exports = api
