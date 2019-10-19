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
        art = await Movie.scope(scopeName).findOneOr404(finder, '找不到相关期刊')
        break
      case 200:
        art = await Music.scope(scopeName).findOneOr404(finder, '找不到相关期刊')
        break
      case 300:
        art = await Sentence.scope(scopeName).findOneOr404(finder, '找不到相关期刊')
        break
    }

    return art
  }
}

module.exports = Art
