import Ajax from '../ajax/ajax.js'

class Util extends Ajax {
  error (text) {
    let err = new Error(text)
    throw err
  }
  // @params (时间戳, 'YYYY-MM-DD hh:mm:ss'(默认值))
  // @return 2017-8-16 22:17:53
  formatDate (unix, format) {
    let date = new Date(UNIX)
    let T = {
      'Y': date.getFullYear(),
      'M': date.getMonth() + 1,
      'D': date.getDate(),
      'h': date.getHours(),
      'm': date.getMinutes(),
      's': date.getSeconds()
    }
    for (let i of Object.keys(T)) {
      let reg = new RegExp(`(${i})+`)
      format = format.replace(reg, i)
    }
    format = format.replace(/[YMDhms]/g, (val, index, arr) => {
      val = T[val] < 10 ? `0${T[val]}` : T[val]
      return val
    })
    return format
  }
}

export default Util
