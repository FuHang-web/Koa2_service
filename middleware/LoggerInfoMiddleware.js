const {
  accessLogger,
  errorLogger,
  defaultLogger
} = require("../logger/logs");
// console.log(accessLogger);
function AccessLogger(ctx, next) {
  const logs = `path:${ctx.path} | method:${ctx.method} | ua:${ctx.header["user-agent"]}`;
  // defaultLogger.info(logs);
  accessLogger.info(logs);
  return next();
}

function ErrorLogger(err, ctx) {
  // console.log(ctx.request.body,'11111111111111111111111111111');
  // console.log('0000000000000000000000000');
  // defaultLogger.error(err);
  errorLogger.error({
    error: err,
    requestBody:ctx.request.body,
    request: ctx.request,
    response: ctx.response,
    app: ctx.app,
    originalUrl: ctx.originalUrl,
  });
  // console.log(ctx);
}

module.exports = {
  AccessLogger,
  ErrorLogger
};