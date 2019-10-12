const { Sequelize, Model, db } = require('../../core/db')

class User extends Model {}

User.init({
  nickname: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize: db,
  tableName: 'user'
})

module.exports = User
