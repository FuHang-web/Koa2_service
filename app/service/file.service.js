const Files = require('../models/file.models')

class FilesService {
  async createFiles(file) {
    const res = await Files.create({
      // 表的字段：
      file_id: file.file_id,
      file_name: file.file_name,
      url: file.url,
      create_by: file.create_by,
      update_by: file.update_by,
    })
    return res
  }
}

module.exports = new FilesService()