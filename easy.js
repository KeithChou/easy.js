import Event from './event/event.js'

class Easy extends Event {
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
  childrens (target, child) {
    if (!(target instanceof Object)) {
      target = this.one(target)
    }
    if (!(child instanceof Object)) {
      child = this.one(child)
    }
    let itChildList = target.children
    for (let i = 0; i < itChildList.length; i++) {
      let node = itChildList[i]
      if (node === child) {
        return child
      }
      if (node.hasChildNodes()) {
        node = this.childrens(node, child)
        if (node !== null) {
          return node
        }
      }
    }
    return null
  }
  parents (target, parent) {
    if (!(target instanceof Object)) {
      target = this.one(target)
    }
    if (!(parent instanceof Object)) {
      parent = this.one(parent)
    }
    if (parent == null || target == null) {
      return null
    }
    if (target === parent) {
      return target
    }
    let itParent = target.parentNode
    while (itParent !== parent) {
      itParent = itParent.parentNode
    }
    return itParent
  }
}

const $ = new Easy()
export default $
