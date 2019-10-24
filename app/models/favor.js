const { db, Sequelize, Model, Op } = require('../../core/db')
const Art = require('./Art')
const { LikeError, DislikeError, NotFound } = require('@errors')

class Favor extends Model {

  static async like(art_id, type, uid) {
    const likeFiled = { art_id, type, uid }
    const favor = await Favor.findOne({
      where: likeFiled
    })
    if (favor) throw new LikeError()
    return db.transaction(async t => {
      await Favor.create(likeFiled, { transaction: t })
      const art = await Art.getData(art_id, type, false)
      if (!art) throw new NotFound('点赞失败！')
      await art.increment('fav_nums', { by: 1, transaction: t })
    })
  }

  static async dislike(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: { art_id, type, uid }
    })
    if (!favor) throw new DislikeError()
    return db.transaction(async t => {
      await favor.destroy({
        force: false,
        transaction: t
      })
      const art = await Art.getData(art_id, type, false)
      await art.decrement('fav_nums', { by: 1, transaction: t })
    })
  }

  static async userLikeIt(art_id, type, uid) {
    const favor = await Favor.findOne({
      where: { art_id, type, uid }
    })
    return favor ? true : false
  }

  static async getMyClassicFavors(uid) {
    const favors = await Favor.findAll({
      where: {
        uid,
        type: {
          [Op.not]: 400
        }
      }
    })

    if (!favors) throw new Notfound('没有收藏任何期刊')

    return await Art.getList(favors)
  }

  static async getBookFavor(uid, bookId) {
    const favorCount = await Favor.count({
      where: {
        art_id: bookId,
        type: 400
      }
    })
    const myFavor = await Favor.findOne({
      where: {
        art_id: bookId,
        type: 400,
        uid,
      }
    })
    return {
      fav_nums: favorCount,
      like_status: myFavor ? true : false
    }
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
