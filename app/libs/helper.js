const flattenArr = (arr, key) => {
  return arr.reduce((map, item) => {
    map[item[key]] = item
    return map
  }, {})
}

const objToArr = obj => {
  return Object.keys(obj).map(item => obj[item])
}

const valueArr = obj => {
  return Object.values()
}
