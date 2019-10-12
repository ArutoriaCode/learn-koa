const Router = require('koa-router')
const { PositiveIntergerValidator } = require('../../validators/validator')

api = new Router({
  prefix: '/v1/test'
})

api.get('/:id', async ctx => {
  const v = new PositiveIntergerValidator().validate(ctx)
  
})

module.exports = api
