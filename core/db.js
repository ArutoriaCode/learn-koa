const { Sequelize, Model: _Model } = require('sequelize')
const {
  dbName, host, port, user, password
} = require('../config/config').database
const {
  NotFound
} = require('../core/HttpException')

class Model extends _Model {

  static async findOneOr404(options, errmsg) {
    let rsp = await this.findOne(options)
    if (!rsp) {
      throw new NotFound(errmsg)
    }
    return rsp
  }

}

const sequelize = new Sequelize(dbName, user, password, {
  host,
  port,
  dialect: 'mysql',
  logging: true,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true
  }
})

sequelize.sync({
  force: false
})

module.exports = {
  Sequelize,
  Model,
  db: sequelize
}
