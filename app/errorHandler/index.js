module.exports = {
  errorHandler(err, ctx) {
    // console.log(err);
    let status = 500
    switch (err.code) {
      case '10001':
        status = 201
        break;
      case '10002':
        status = 201
        break;
      case '10003':
        status = 409
        break;
      case '10004':
        status = 201
        break;
      case '10005':
        status = 409
        break;
      case '10006':
        status = 201
        break;
      case '10007':
        status = 409
        break;
      case '10008':
        status = 201
        break;
      case '10101':
        status = 401
        break;
      case '10102':
        status = 401
        break;
      case '10201':
        status = 409
        break;
      default:
        break;
    }
    ctx.status = status
    ctx.body = err
  }
}