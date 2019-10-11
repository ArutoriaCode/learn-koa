const log4js = require('log4js')
const data = new Date()

log4js.configure({
    appenders: {
        everything: { type: 'file', filename: `logs/${data.toLocaleDateString()}.log` }
    },
    categories: {
        default: { appenders: [ 'everything' ], level: 'error' }
    }
})

const logger = log4js.getLogger()

module.exports = logger