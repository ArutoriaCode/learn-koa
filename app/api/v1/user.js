const Router = require('koa-router')

const { ReisgterValidator } = require('../../validators/validator')
const { Success } = require('../../../core/HttpException')
const User = require('../../models/user')

api = new Router({
  prefix: '/v1/user'
})

api.post('/register', async ctx => {
  const v = await new ReisgterValidator().validate(ctx)
  const r = await User.create({
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  })
  Success('注册成功！')
})

module.exports = api
