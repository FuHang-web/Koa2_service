const {
  configure,
  getLogger
} = require('log4js')

const config = require('../config/config')

configure(config.log);

module.exports = {
  accessLogger: getLogger("info"),
  errorLogger: getLogger("error"),
  dbLogger: getLogger("db"),
  defaultLogger: getLogger()
}