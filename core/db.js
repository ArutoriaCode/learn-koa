const {Sequelize, Model} = require('sequelize')
const {
  dbName, host, port, user, password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  host, 
  port,
  dialect: 'mysql',
  logging: true,
  timezone: '+08:00',
  define: {

  }
})

sequelize.sync()

module.exports = {
  Sequelize,
  Model,
  db: sequelize
}
