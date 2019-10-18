const { db, Sequelize, Model } = require('../../core/db')

class Flow extends Model { }

Flow.init({
  index: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
}, {
  sequelize: db,
  tableName: 'flow'
})

module.exports = Flow
