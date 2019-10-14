const Router = require('koa-router')

const { ReisgterValidator } = require('../../validators/validator')
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
  ctx.body = {
    message: '成功！'
  }
})

api.get('/id', async ctx => {
  const user = await User.findOne({
    where: {
      id: 1
    }
  })
  ctx.body = {
    message: '成功！',
    data: user
  }
})

module.exports = api
