const OSS = require('ali-oss');
// const path = require("path")
const fs = require('fs')
const {
  currentTime,
  getNanoId
} = require('../utils/tool')

const {
  ossConfigure
} = require('../app/controller/configure')

const clientConfigure = async (ctx, next) => {
  let client;
  const key = ctx.cookies.get('oss_parameter') && JSON.parse(ctx.cookies.get('oss_parameter'))
  // console.log(key);
  if (key && key.region) {
    client = new OSS(key)
  } else {
    const data = await ossConfigure()
    ctx.cookies.set('oss_parameter', JSON.stringify(data), {
      maxAge: 60 * 1000 * 60
    });
    client = new OSS(data)
  }
  return client
}
// let client = new OSS()
// let client = new OSS({
//   // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
//   region: 'oss-cn-chengdu',
//   // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
//   accessKeyId: 'LTAI5tD9h5qMvMJxML2NDCEx',
//   accessKeySecret: 'Gf3spX0IGKcyhJX65zYUicbu9utjsp',
//   // 填写Bucket名称。
//   bucket: 'fu-cloud'
// });


const putStream = async (ctx, next) => {
  try {
    const client = await clientConfigure(ctx, next)
    const files = ctx.request.files; // 获取上传文件
    let list = []
    for (let key in files) {
      let obj = {}
      let file = files[key]
      let fileName = file.name.substr(0, file.name.lastIndexOf('.'))
      let fileSuffix = file.name.substr(file.name.lastIndexOf('.'))
      // let suffix = file.name.substr(file.name.lastIndexOf('.'))
      // 创建可读流
      const stream = fs.createReadStream(file.path);
      // test 为文件，意思是将文件存放到 test 文件夹下
      obj.file_id = await getNanoId()
      const doesItExist = await isExistObject(`/test/${currentTime().date}/${file.name}`, {}, ctx, next)
      if (doesItExist) {
        file.name = `${fileName}${currentTime().time.replace(/:/g,"")}${fileSuffix}`
      }
      let result = await client.putStream(`/test/${currentTime().date}/${file.name}`, stream);
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

async function isExistObject(name, options = {}, ctx, next) {
  try {
    const client = await clientConfigure(ctx, next)
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