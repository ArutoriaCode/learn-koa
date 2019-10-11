const { Sequelize, Model, db } = require('../../core/db')

class User extends Model {}

User.init({
  nickName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize: db
})

module.exports = User
