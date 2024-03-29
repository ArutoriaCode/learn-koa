const { db, Sequelize, Model, Op } = require('../../core/db')
const Favor = require('@models/favor')

class HotBook extends Model {
  static async getAll() {
    const books = await HotBook.findAll({
      order: ['index']
    })

    const ids = []
    books.forEach(book => {
      ids.push(book.id)
    })

    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids,
          type:400
        }
      },
      group: ['art_id'],
      attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
    })

    books.forEach(book => {
      HotBook._getEachBookStatus(book, favors)
    })

    return books
  }

  static _getEachBookStatus(book, favors) {
    let count = 0
    favors.forEach(favor => {
      if (book.id === favor.art_id) count = favor.get('count')
    })
    book.setDataValue('count', count)
    return book
  }
}

HotBook.init({
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.STRING,
  title: Sequelize.STRING
}, {
  sequelize: db,
  tableName: 'hot_book'
})

module.exports = HotBook
