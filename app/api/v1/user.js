const Router = require('koa-router')

api = new Router({
  prefix: '/v1/user'
})

api.get('/user', async (ctx) => {
  ctx.body = {
    message: 'test'
  }
})

module.exports = api
