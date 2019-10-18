const Router = require('koa-router')

const Auth = require('../../../middlewares/auth')

const Flow = require('@models/flow')
const Favor = require('@models/favor')
const Art = require('@models/art')

api = new Router({
  prefix: '/v1/classic'
})

api.get('/latest', new Auth().verify, async ctx => {
  const art = await findArt({
    order: [
      ['index', 'DESC']
    ]
  })
  ctx.body = art
})

api.get('/:index/next', new Auth.verify, async ctx => {
  const index = v.get('path.index')
  const art = await findArt({
    where: {
      index: index + 1
    }
  })
  ctx.body = art
})

api.get('/:index/previous', new Auth.verify, async ctx => {
  const index = v.get('path.index')
  const art = await findArt({
    where: {
      index: index - 1
    }
  })
  ctx.body = art
})

async function findArt (query) {
  const { art_id, type, index } = await Flow.findOne(query)

  const art = await Art.getData(art_id, type)
  const likeStatus = await Favor.userLikeIt(art_id, type, ctx.auth.uid)
  
  art.setDataValue('index', index)
  art.setDataValue('like_status', likeStatus)
  
  return art
}

module.exports = api
