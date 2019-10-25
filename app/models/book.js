const axios = require('axios')
const util = require('util')

const { db, Sequelize, Model } = require('@core/db')
const { yushu } = require('@config')

const Favor = require('@models/favor')

class Book extends Model { 

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

  static async getMyFavorBookCount(uid) {
    const count = await Favor.count({
      where: {
        type: 400,
        uid
      }
    })
    return count
  }

}

Book.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize: db,
  tableName: 'book'
})

module.exports = Book
