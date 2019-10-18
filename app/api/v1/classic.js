const Router = require('koa-router')

const Auth = require('../../../middlewares/auth')

const Flow = require('@models/flow')
const Favor = require('@models/favor')
const Art = require('@models/art')

api = new Router({
  prefix: '/v1/classic'
})

api.get('/latest', new Auth().verify, async ctx => {
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })
  const art = await Art.getData(flow.art_id, flow.type)
  const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
  art.setDataValue('index', flow.index)
  art.setDataValue('like_status', likeLatest)
  ctx.body = art
})

module.exports = api
