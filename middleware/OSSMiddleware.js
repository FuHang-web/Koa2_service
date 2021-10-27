const OSS = require('ali-oss');
// const path = require("path")
// const {oss} = require('../utils/tool')
const {
  oss
} = require('../utils/configure')
const fs = require('fs')
const {
  currentTime,
  getNanoId
} = require('../utils/tool')

let client = new OSS(oss);
// console.log(oss(),'0000000000000000');

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