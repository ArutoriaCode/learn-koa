const Koa = require('koa')
const InitManager = require('./core/init.js')

require('./app/models/user')

app = new Koa()

InitManager.InitCore(app)

app.listen(3001)
