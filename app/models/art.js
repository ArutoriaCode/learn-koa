const {
  Movie,
  Sentence,
  Music
} = require('./classic')

class Art {

  static async getData(art_id, type) {
    
    let art
    const finder = { where: { id: art_id } }

    switch (type) {
      case 100:
        art = await Movie.scope('bh').findOneOr404(finder, '找不到相关资源')
        break
      case 200:
        art = await Music.scope('bh').findOne(finder)
        break
      case 300:
        art = await Sentence.scope('bh').findOne(finder)
        break
    }

    return art
  }
}

module.exports = Art
