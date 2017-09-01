class Ajax {
  constructor (options) {
    this.options = options
    let setting = {
      type: 'get',
      dataType: 'json',
      data: {},
      async: true,
      time: 10000,
      success () {},
      fail () {},
      timeout () {},
      error () {}
    }
    this.options = Object.assign({}, setting, options)
  }
  init () {
    this.createRequest()
  }
  handleResponse (data) {
    if (data) {
      if (data.success) {
        this.options.success(data.data)
      } else {
        if (this.options.fail instanceof Function) {
          this.options.fail(data.data)
        }
      }
    } else {
      this.options.error()
    }
  }
  handleTimeOut () {
    window.setTimeout(timer => {
      if (this.options.timeout instanceof Function) {
        throw new Error('网络错误，请重试！')
      }
    }, this.options.time)
  }
  createRequest () {
    let [xhr, type, url, async] = [new window.XMLHttpRequest(), this.options.type.toLowerCase(), this.options.url, this.options.async]
    let data = this.paramToString(this.options.data)
    let ajax = new Promise((resolve, reject) => {
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            let data = JSON.parse(xhr.responsetText)
            resolve(data)
          }
          // 请求已发出，在time之内，未收到响应。可能是网络错误导致
          reject()
        }
      })
      if (type === 'get') {
        xhr.open(type, `${url}?${data}`, async)
        xhr.send(null)
      } else {
        xhr.open(type, url, async)
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencode')
        xhr.send(data)
      }
    })
    let time = new Promise((resolve, reject) => {
      reject(this.handleTimeOut())
    })
    Promise
      .race([ajax, time])
      .then(data => {
        this.handleResponse(data)
      })
      .catch(() => {
        this.options.timeout()
      })
  }
  paramToString (obj) {
    let [str = ''] = []
    for (let i in obj) {
      let name = window.encodeURIComponent(i)
      let value = window.encodeURIComponent(obj[i])
      str += `&${name}=${value}`
    }
    return str.slice(1)
  }
}

export default Ajax
