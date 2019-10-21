const User = require('../../app/models/user')
const { LinValidator, Rule } = require('../../core/lin-validator-v2')
const { LoginType, ArtType } = require('../libs/enum')

class CheckedType {
  constructor(type, source) {
    this.enumType = type || LoginType
    this.source = source || 'body'
  }

  checkType(vals) {
    let type = vals[this.source].type
    if (!type) throw new Error('type is must!')
    type = parseInt(type)
    if (!this.enumType.isThisType(type)) {
      throw new Error('type 参数不合法！')
    }
  }
}

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

  async validateEmail(vals) {
    const user = await User.findOne({
      where: {
        email: vals.body.email
      }
    })
    if (user) throw new Error('Email 已被注册！')
  }

}

class TokenValidator extends LinValidator {
  constructor() {
    super()
    const checker = new CheckedType()
    this.validateLoginType = checker.checkType.bind(checker)
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32
      })
    ]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', {
        min: 6,
        max: 128
      })
    ]
  }
}

class LikeValidator extends PositiveIntergerValidator {
  constructor() {
    super()
    const checker = new CheckedType(ArtType)
    this.validateType = checker.checkType.bind(checker)
  }
}

class ClassicValidator extends LikeValidator {
  constructor() {
    super()
    const checker = new CheckedType(ArtType, 'path')
    this.validateType = checker.checkType.bind(checker)
  }
}

class SearchValidator extends LinValidator {
  constructor() {
    super()
    this.q = [
      new Rule('isLength', '搜索关键词不能为空', {
        min: 1,
        max: 16
      })
    ]
    this.start = [
      new Rule('isInt', 'start 不符合要求', {
        min: 0,
        max: 60000
      }),
      new Rule('isOptional', '', 0)
    ]
    this.count = [
      new Rule('isInt', 'count 不符合要求', {
        min: 1,
        max: 20
      }),
      new Rule('isOptional', '', 20)
    ]
  }
}

module.exports = {
  PositiveIntergerValidator,
  ReisgterValidator,
  TokenValidator,
  LikeValidator,
  ClassicValidator,
  SearchValidator
}
