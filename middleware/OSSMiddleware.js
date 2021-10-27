const OSS = require('ali-oss');
// const path = require("path")
const fs = require('fs')
const {
  currentTime,
  getNanoId
} = require('../utils/tool')

let client = new OSS({
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-chengdu',
  // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  accessKeyId: 'LTAI5tD9h5qMvMJxML2NDCEx',
  accessKeySecret: 'Gf3spX0IGKcyhJX65zYUicbu9utjsp',
  // 填写Bucket名称。
  bucket: 'fu-cloud'
});

const putStream = async (ctx, next) => {
  try {
    const files = ctx.request.files; // 获取上传文件
    let list = []
    for (let key in files) {
      let obj = {}
      let file = files[key]
      let suffix = file.name.substr(file.name.lastIndexOf('.'))
      console.log(file.name);
      // console.log(file.name.lastIndexOf('.'));
      console.log(suffix);
      // console.log(file);
      // 创建可读流
      const stream = fs.createReadStream(file.path);
      // test 为文件，意思是将文件存放到 test 文件夹下
      obj.file_id = await getNanoId()
      const doesItExist = await isExistObject(`/test/${currentTime().date}/${file.name}`)
      if (doesItExist) {
        file.name = `${file.name}(1)`
      }
      let result = await client.putStream(`/test/${currentTime().date}/${file.name}`, stream);
      // const is = await isExistObject(`/test/${currentTime().date}/${obj.file_id}${suffix}`)
      // console.log(is);
      // let result = await client.putStream(`/test/${currentTime().date}/${obj.file_id}${suffix}`, stream);
      // console.log(result);
      obj.file_name = file.name
      obj.url = result.url
      obj.create_by = ctx.state.user.username
      list.push(obj)
    }
    ctx.state.files = list
    await next()
  } catch (e) {
    console.log(e)
  }
}

async function isExistObject(name, options = {}) {
  try {
    await client.head(name, options);
    return true
  } catch (error) {
    if (error.code === 'NoSuchKey') {
      return false
    }
  }
}


module.exports = {
  putStream,
}