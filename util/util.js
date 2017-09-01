import Ajax from '../ajax/ajax.js'

class Util extends Ajax {
  constructor () {
    this.href = ''
  }
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
  hash () {
    this.href = window.location.href
    if (/[#]/g.test(this.href)) {
      return window.location.hash
    } else {
      return '""'
    }
  }
  query () {
    this.href = 'http://localhost:8085/purchase_flow.html#/buy?end_ts=1504022400&id=26&price=7520000&start_ts=1503972000&username1=82&username2=83'
    if (/[?]/g.test(this.href)) {
      let index = this.href.indexOf('?')
      let [arr, paramToObj, param, name, value] = [this.href.slice(index + 1).split('&'), {}]
      for (let i in arr) {
        param = arr[i].split('=')
        name = window.encodeURIComponent(param[0])
        value = window.encodeURIComponent(param[1])
        paramToObj[name] = value
      }
      return paramToObj
    } else {
      return '""'
    }
  }
  throttle (fn, option) {
    let time = null
    let start = null
    // delay: 延迟执行时间
    // mustRunTime: 若函数500内仍未执行，则会执行。场景如：resize按住不放超过500就会执行一次fn
    // immediate: true：表明第一次要立即执行；false表明第一次需要等待delay之后执行
    let setting = {
      delay: 300,
      mustRunTime: 500,
      immediate: true
    }
    option = Object.assign({}, setting, option)
    return function () {
      let args = arguments
      let currStart = +new Date()
      if (!start) {
        start = currStart
      }
      if (!option.immediate || currStart - start > option.mustRunTime) {
        fn.apply(this, args)
        start = currStart
        option.immediate = true
      } else {
        window.clearTimeout(time)
        time = window.setTimeout(() => {
          fn.apply(this, args)
        }, option.delay)
      }
    }
  }
}

export default Util
