module.exports = {
  env: 'dev', // prod
  database: {
    dbName: 'koax',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234567890'
  },
  security: {
    secretKey: '/1&*9a0$@3549*&(@)',
    expiresIn: 60 * 60
  }
}