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
  error (text) {
    let err = new Error(text)
    throw err
  }
  on (event, target, cb, bubble = false) {
    let doc = document
    doc.addEventListener(event, e => {
      let obj = e.target
      let { id, className, name } = {
        id: obj.id,
        className: obj.className,
        name: obj.name
      }
      if (id) {
        switch (id) {
          case `${target.slice(1)}`:
            cb(e)
            break
          default:
            this.error('未找到id对应的DOM节点，document事件代理失败')
        }
      } else if (className) {
        switch (className) {
          case `${target.slice(1)}`:
            cb(e)
            break
          default:
            this.error('未找到class对应的DOM节点，document事件代理失败')
        }
      } else if (name) {
        switch (name) {
          case target:
            cb(e)
            break
          default:
            this.error('未找到name对应的DOM节点，document事件代理失败')
        }
      }
    }, bubble)
  }
}

const $ = new Easy()
export default $
