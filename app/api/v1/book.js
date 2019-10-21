const Router = require('koa-router')

const HotBook = require('@models/hot-book')
const Book = require('@models/book')
const { PositiveIntergerValidator, SearchValidator } = require('@validator')
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

module.exports = api
