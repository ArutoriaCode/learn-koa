const Router = require('koa-router')

const { ReisgterValidator } = require('../../validators/validator')

api = new Router({
  prefix: '/v1/user'
})

api.post('/register', async ctx => {
  const v = new ReisgterValidator().validate(ctx)
})

module.exports = api
