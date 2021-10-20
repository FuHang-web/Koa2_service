const {
  configure,
  getLogger
} = require('log4js')

const config = require('../config/config')

console.log(getLogger("info"));

configure(config.log);
// module.exports = accessLogger = getLogger("info");
// module.exports = dbLogger = getLogger("db");
// module.exports = getLogger();

module.exports = {
  accessLogger: getLogger("info"),
  dbLogger: getLogger("db"),
  default: getLogger()
}