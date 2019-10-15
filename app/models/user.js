const bcrypt = require('bcryptjs')

const { Sequelize, Model, db } = require('../../core/db')
const { AuthFailed } = require('../../core/HttpException')

class User extends Model {
  static async verifyEmailPassword (account, password) {
    const user = await User.findOne({
      where: {
        email: account
      }
    })
    if (!user) throw new AuthFailed('账号或密码不正确！')
    const correct = bcrypt.compareSync(password, user.password)
    if (!correct) throw new AuthFailed('账号或密码不正确！')
    
    return user
  }
}

User.init({
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      console.log(val)
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', psw)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize: db,
  tableName: 'user'
})

module.exports = User
