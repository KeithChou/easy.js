class Ajax {
  constructor (options) {
    this.options = options
    let setting = {
      type: 'get',
      dataType: 'json',
      data: {},
      timeout: 10000,
      success (data) {},
      error (err) {}
    }
    this.options = Object.assign({}, setting, options)
  }
  init (() {
    this.createRequest()
  })()
  createRequest() {
    let xhr = new window.XMLHttpRequest()
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          let data = JSON.parse(xhr.responsetText)
          this.options.success(data)
        }
      }
    })
  }
}

export default Ajax