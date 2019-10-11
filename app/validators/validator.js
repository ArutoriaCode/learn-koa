const { LinValidator, Rule } = require('../../core/lin-validator')

class PositiveIntergerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', ' 必须是正整数', {min: 1}),
    ]
  }
}


module.exports = {
  PositiveIntergerValidator
}
