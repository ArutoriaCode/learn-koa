const { db, Sequelize, Model } = require('../../core/db')

const classicField = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.STRING,
  fav_nums: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
}

class Movie extends Model { }

Movie.init(classicField, {
  sequelize: db,
  tableName: 'movie'
})

class Sentence extends Model { }

Sentence.init(classicField, {
  sequelize: db,
  tableName: 'sentence'
})

class Music extends Model { }

Music.init({ ...classicField, url: Sequelize.STRING }, {
  sequelize: db,
  tableName: 'music'
})

module.exports = {
  Movie,
  Sentence,
  Music
}
