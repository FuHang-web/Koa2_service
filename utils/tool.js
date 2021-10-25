function convertToTreeData(data, pid) {
  const result = []
  let temp = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].parent_id === pid) {
      const obj = data[i]
      // const obj = {
      //   'label': data[i].name,
      //   'id': data[i].id
      // }
      temp = convertToTreeData(data, data[i].id)
      if (temp.length > 0) {
        obj.children = temp
      }
      result.push(obj)
    }
  }
  return result
}

module.exports = {
  convertToTreeData
}