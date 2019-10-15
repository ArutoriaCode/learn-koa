function isThisType(val) {
  return Object.keys(this).some(key => this[key] === val)
}

const LoginType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 200,
  isThisType
}

module.exports = {
  LoginType
}
