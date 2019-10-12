const { LinValidator, Rule } = require('../../core/lin-validator')

class PositiveIntergerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', ' 必须是正整数', { min: 1 }),
    ]
  }
}

class ReisgterValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '不符合邮箱规范'),
    ]
    this.password1 = [
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称长度至少4个字符，最多32个字符', {
        min: 4,
        max: 32
      })
    ]
  }

  validatePassword(vals) {
    const { password1: psw1, password2: psw2 } = vals.body
    if (psw1 !== psw2) throw new Error('两个密码必须相同！')
  }
}


module.exports = {
  PositiveIntergerValidator,
  ReisgterValidator
}
