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
  // 函数节流
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
  // 函数防抖
  debounce (fn, wait, immediate = false) {
    let [time, result, timestamp, args, context] = []
    function later () {
      let late = +new Date() - timestamp
      if (wait > late && late >= 0) {
        time = window.setTimeout(later, wait - late)
      } else {
        time = null
        result = fn.apply(context, args)
        context = args = null
      }
    }
    return function () {
      context = this
      args = arguments
      timestamp = +new Date()
      let callNow = immediate && !time
      if (!time) {
        time = window.setTimeout(later, wait)
      }
      if (callNow) {
        result = fn.apply(context, args)
        context = args = null
      }
      return result
    }
  }
  // 函数分时
  timeChunk (arr, fn, option) {
    // arr表示需要处理的数据
    // fn为处理数据的回调
    // option为参数
    let timer = null
    let inner // 执行定时器循环的变量
    let setting = {
      count: 10,   // 分批执行的个数
      delay: 500   // 延迟执行的时间
    }
    option = Object.assign({}, setting, option)
    let insert = () => {
      let min = Math.min(option.count, arr.length)
      for (let i = 0; i < min; i++) {
        fn(arr.shift())
      }
    }
    return function () {
      timer = window.setTimeout(inner = () => {
        if (!arr.length) { // 如果全部节点都已经被创建好
          window.clearTimeout(timer)
        } else {
          insert()
          inner()
        }
      }, option.delay) // 分批执行的时间间隔
    }
    /*
      使用示例
      var arr = []
      for (var i = 1; i <= 1000; i++) {
        arr.push(i)   // i表示好友列表
      }
      // arr表示有1000个好友的数组
      var renderFriendList = timeChunk(arr, (data) => {
        var div = ''
        div = `<div>${data}</div>`
        document.body.insertAdjacentHTML('beforeend', div)
      }, { count: 10, delay: 500 })
      renderFriendList()
    */
  }
  // 函数柯里化
  curry (fn, context) {
    var args = Array.prototype.slice.call(arguments, 2)
    return function () {
      var arg = Array.prototype.slice.call(arguments)
      var arr = args.concat(arg)
      return fn.apply(context, arr)
    }
  }
}

export default Util
