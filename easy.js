class Easy {
  one (selector) {
    let element = document.querySelector(selector)
    return element
  }
  all (selector) {
    let elements = document.querySelectorAll(selector)
    return elements
  }
}

const $ = new Easy()
export default $
