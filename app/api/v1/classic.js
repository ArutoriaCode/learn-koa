const Router = require('koa-router')

const Auth = require('../../../middlewares/auth')
const Flow = require('../../models/flow')
const Art = require('../../models/art')

api = new Router({
  prefix: '/v1/classic'
})

api.get('/latest', new Auth().verify, async ctx => {
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })
  const art = await Art.getData(20, flow.type)
  ctx.body = art
})

module.exports = api
