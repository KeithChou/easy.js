class Ajax {
  constructor (options) {
    this.options = options
    let setting = {
      type: 'get',
      dataType: 'json',
      data: {},
      async: true,
      time: 10000,
      success (data) {},
      fail (err) {}
      timeout (err) {},
      error () {}
    }
    this.options = Object.assign({}, setting, options)
  }
  init (() {
    this.createRequest()
  })()
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
        this.options.timeout('timeout')
        return
      }
    }, this.options.time)
  }
  createRequest() {
    let [xhr, type, url, async] = [new window.XMLHttpRequest(), this.options.type.toLowerCase(), this.options.url, this.options.async]
    let data = this.paramToString(this.options.data)
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          let data = JSON.parse(xhr.responsetText)
          this.handleResponse(data)
        } else {
          this.handleResponse()
        }
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
    this.handleTimeOut()
  }
  paramToString (obj) {
    let [str = ''] = []
    for (let i in obj) {
      let name = window.encodeURIComponent(i)
      let value = window.encodeURIComponent(obj[i])
      str +=  `&${name}=${value}`
    }
    return str.slice(1)
  }
}

export default Ajax