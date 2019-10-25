const { Sequelize, Model: _Model, Op } = require('sequelize')
const { unset, clone, isArray } = require('lodash')
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

  toJSON() {
    let data = clone(this.dataValues)
    unset(data, 'updated_at')
    unset(data, 'created_at')
    unset(data, 'deleted_at')
    if (isArray(this.exclude)) this.exclude.forEach(v => unset(data, v))
    return data
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
    underscored: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ['created_at', 'updated_at', 'deleted_at']
        }
      }
    }
  }
})

sequelize.sync({
  force: false
})

module.exports = {
  Sequelize,
  Model,
  Op,
  db: sequelize
}
