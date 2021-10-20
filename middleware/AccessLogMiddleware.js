const {
  accessLogger
} = require("../logger/logs");
// console.log(accessLogger);
function AccessLogMiddleware(ctx, next) {
  const logs = `path:${ctx.path} | method:${ctx.method} | ua:${ctx.header["user-agent"]}`;
  accessLogger.info(logs);
  return next();
}

module.exports = AccessLogMiddleware;