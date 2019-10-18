const Router = require('koa-router')

const Auth = require('@auth')
const Flow = require('@models/flow')
const Favor = require('@models/favor')
const Art = require('@models/art')
const { PositiveIntergerValidator } = require('@validator')

api = new Router({
  prefix: '/v1/classic'
})

api.get('/latest', new Auth().verify, async ctx => {
  const art = await findArt({
    order: [
      ['index', 'DESC']
    ]
  }, ctx.auth.uid)
  ctx.body = art
})

api.get('/:index/next', new Auth().verify, async ctx => {
  const v = await new PositiveIntergerValidator().validate(ctx, {
    id: 'index'
  })
  const index = v.get('path.index')
  const art = await findArt({
    where: {
      index: index + 1
    }
  }, ctx.auth.uid)
  ctx.body = art
})

api.get('/:index/previous', new Auth().verify, async ctx => {
  const v = await new PositiveIntergerValidator().validate(ctx, {
    id: 'index'
  })
  const index = v.get('path.index')
  const art = await findArt({
    where: {
      index: index - 1
    }
  }, ctx.auth.uid)
  ctx.body = art
})

async function findArt (query, uid) {
  const { art_id, type, index } = await Flow.findOne(query)

  const art = await Art.getData(art_id, type)
  const likeStatus = await Favor.userLikeIt(art_id, type, uid)
  
  art.setDataValue('index', index)
  art.setDataValue('like_status', likeStatus)
  
  return art
}

module.exports = api
