const {
  Movie,
  Sentence,
  Music
} = require('./classic')

class Art {

  static async getData(art_id, type, useScope = true) {

    let art
    const finder = { where: { id: art_id } }
    const scopeName = useScope ? 'bh' : null
    switch (type) {
      case 100:
        art = await Movie.scope(scopeName).findOneOr404(finder, '找不到相关资源')
        break
      case 200:
        art = await Music.scope(scopeName).findOne(finder)
        break
      case 300:
        art = await Sentence.scope(scopeName).findOne(finder)
        break
    }

    return art
  }
}

module.exports = Art
