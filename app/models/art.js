const { Op } = require('sequelize')

const {
  Movie,
  Sentence,
  Music
} = require('./classic')


class Art {

  static async getList(favors) {
    const artObj = {
      100: [],
      200: [],
      300: []
    }

    for (let favor of favors) {
      artObj[favor.type].push(favor.art_id)
    }
    
    let artList = []
    for (let key in artObj) {
      const ids = artObj[key]
      if (ids.length === 0) continue
      
      key = parseInt(key)
      
      const arts = await Art._getListByType(ids, key)
      artList = [...artList, ...arts]
    }
    return artList
  }

  static async _getListByType(ids, type) {
    let arts = []
    const finder = {
      where: { 
        id: {
          [Op.in]: ids
        }
      }
    }
    const scopeName = 'bh'
    switch (type) {
      case 100:
        arts = await Movie.scope(scopeName).findAll(finder)
        break
      case 200:
        arts = await Music.scope(scopeName).findAll(finder)
        break
      case 300:
        arts = await Sentence.scope(scopeName).findAll(finder)
        break
    }
    console.log('===============================', arts)
    return arts
  }

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
