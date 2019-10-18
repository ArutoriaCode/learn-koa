const { db, Sequelize, Model } = require('../../core/db')
const { Movie, Music, Sentence } = require('./classic')
const Art = require('./Art')
const { LikeError, DisLikeError } = require('../../core/HttpException')

class Favor extends Model {

  static async like(art_id, type, uid) {
    const likeFiled = { art_id, type, uid }
    const favor = await Favor.findOne({
      where: likeFiled
    })
    if (favor) throw new LikeError()
    return db.transaction(async t => {
      await Favor.create(likeFiled, { transaction: t })
      const art = await Art.getData(art_id, type)
      await art.increment('fav_nums', { by: 1, transaction: t })
    })
  }

  static async dislike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: { art_id, type, uid }
    })
    if (!favor) throw new DisLikeError()
    return db.transaction(async t => {
      await favor.destroy({
        force: false,
        transaction: t
      })
      const art = await Art.getData(art_id, type)
      await art.decrement('fav_nums', { by: 1, transaction: t })
    })
  }

  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: { art_id, type, uid }
    })
    return favor ? true : false
  }

}

Favor.init({
  uid: Sequelize.STRING,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize: db,
  tableName: 'favor'
})

module.exports = Favor
