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
    expiresIn: 60 * 60 * 24
  },
  yushu: {
    detailUrl: 'http://t.yushu.im/v2/book/id/%s',
    keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  },
  baseHost: 'http://loaclhost:3001'
}