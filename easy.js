class Easy {
  one (selector) {
    let element = document.querySelector(selector)
    return element
  }
  all (selector) {
    let elements = document.querySelectorAll(selector)
    return elements
  }
  forms (selector) {
    let elements = document.forms || document.querySelectorAll(selector)
    return elements
  }
  event (event, target, cb, async = false) {
    target.addEventListener(event, e => {
      cb(e)
    }, async)
  }
}

const $ = new Easy()
export default $
