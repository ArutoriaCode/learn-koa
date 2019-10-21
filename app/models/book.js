const axios = require('axios')
const util = require('util')
const { db, Sequelize, Model } = require('@core/db')
const { yushu } = require('@config')

class Book extends Model { 
  
  constructor(id) {
    super()
    this.id = id
  }

  async detail() {
    const url = util.format(yushu.detailUrl, this.id)
    const detail = await axios.get(url)
    return detail.data
  }

  static async searchFromYushu(q, start, count, summary = 1) {
    const url = util.format(yushu.keywordUrl, encodeURI(q), count, start, summary)
    const result = await axios.get(url)
    return result.data
  }
}

Book.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    default: 0
  }
}, {
  sequelize: db,
  tableName: 'book'
})

module.exports = Book
