const Router = require('koa-router')

const HotBook = require('@models/hot-book')
const Book = require('@models/book')
const Favor = require('@models/favor')
const Comment = require('@models/book-comment')
const Auth = require('../../../middlewares/auth')
const { PositiveIntergerValidator, SearchValidator, AddShortCommentValidator } = require('@validator')
const { Success } = require('@errors')

api = new Router({
  prefix: '/v1/book'
})

api.get('/hot_list', async ctx => {
  const hotBook = await HotBook.getAll()
  Success({
    data: hotBook
  })
})

api.get('/:id/detail', async ctx => {
  const v = await new PositiveIntergerValidator().validate(ctx)
  const book = await new Book(v.get('path.id')).detail()
  Success({ data: book })
})

api.get('/search', async ctx => {
  const v = await new SearchValidator().validate(ctx)
  const result = await Book.searchFromYushu(v.get('query.q'), v.get('query.start'), v.get('query.count'))
  Success({ data: result })
})

api.get('/favor/count', new Auth().verify, async ctx => {
  const count = await Book.getMyFavorBookCount(ctx.auth.uid)
  Success({
    data: {
      count
    }
  })
})

api.get('/:book_id/favor', new Auth().verify, async ctx => {
  const v = await new PositiveIntergerValidator().validate(ctx, {
    id: 'book_id'
  })
  const result = await Favor.getBookFavor(ctx.auth.uid, v.get('path.book_id'))
  Success({
    data: result
  })
})

api.post('/add/short_comment', new Auth().verify, async ctx => {
  const v = await new AddShortCommentValidator().validate(ctx, {
    id: 'book_id'
  })
  await Comment.addComment(v.get('body.book_id'), v.get('body.content'))
  Success()
})

api.get('/:book_id/short_comment', new Auth().verify, async ctx => {
  const v = await new PositiveIntergerValidator().validate(ctx, {
    id: 'book_id'
  })
  const comments = await Comment.getComments(v.get('path.book_id'))
  comments.exclude = ['content']
  Success({
    data: comments
  })
})

module.exports = api
