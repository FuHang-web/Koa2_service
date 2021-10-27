const {
  customAlphabet
} = require('nanoid')
const nanoid = customAlphabet('1234567890abcdef', 18)

const convertToTreeData = (data, pid) => {
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

const currentTime = () => {
  let dateTime = new Date()
  let year = dateTime.getFullYear()
  let month = dateTime.getMonth() + 1
  let day = dateTime.getDate()
  let hours = dateTime.getHours()
  let minute = dateTime.getMinutes()
  let second = dateTime.getSeconds()
  month = month < 10 ? `0${month}` : month
  day = day < 10 ? `0${day}` : day
  hours = hours < 10 ? `0${hours}` : hours
  minute = minute < 10 ? `0${minute}` : minute
  second = second < 10 ? `0${second}` : second
  let date = `${year}-${month}-${day}`
  let time = `${hours}:${minute}:${second}`
  return {
    date: date,
    time: time,
    dateTime: `${date} ${time}`
  }
}

const getNanoId = async () => {
  return nanoid()
}

module.exports = {
  convertToTreeData,
  currentTime,
  getNanoId
}