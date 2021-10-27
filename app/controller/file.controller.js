const {
  createFiles
} = require('../service/file.service')

class FilesController {
  async addFiles(ctx, next) {
    // 1、获取数据
    const data = ctx.state.files
    // console.log(data);
    // 2、操作数据库
    try {
      let list = []
      for (const i of data) {
        const {dataValues: res} = await createFiles(i)
        list.push(res)
      }
      ctx.body = {
        code: 200,
        message: '上传成功',
        data: list
      }
    } catch (error) {
      console.log(error);
      ctx.app.emit('error', addMenuError(), ctx)
    }
    // 3、返回结果
  }
}


module.exports = new FilesController()