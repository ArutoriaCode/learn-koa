const Router = require('koa-router')

const Auth = require('../../../middlewares/auth')
const Favor = require('@models/favor')
const { LikeValidator } = require('@validator')
const { Success } = require('@errors')

api = new Router({
  prefix: '/v1/like'
})

api.post('/', new Auth().verify, async ctx => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  })
  const { art_id, type } = v.get('body')

  await Favor.like(art_id, type, ctx.auth.uid)

  Success()
})

api.post('/cancel', new Auth().verify, async ctx => {
  const v = await new LikeValidator().validate(ctx, {
    id: 'art_id'
  })
  const { art_id, type } = v.get('body')

  await Favor.dislike(art_id, type, ctx.auth.uid)

  Success()
})

module.exports = api
