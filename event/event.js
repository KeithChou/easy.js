import Util from '../util/util.js'

const ONCE = Symbol('ONCE')
class Event extends Util {
  constructor () {
    this[ONCE] = false
  }
  event (event, target, cb, bubble = false) {
    target.addEventListener(event, e => {
      cb(e)
    }, bubble)
  }
  one (event, target, cb, bubble = false) {
    let events = e => {
      cb(e)
    }
    if (this[ONCE]) {
      target.removeEventListener(event, events, bubble)
      return
    }
    this[ONCE] = true
    target.addEventListener(event, events, bubble)
  }
  on (event, target, cb, bubble = false) {
    document.addEventListener(event, e => {
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
            console.log('error')
        }
      }
      if (className) {
        switch (className) {
          case `${target.slice(1)}`:
            cb(e)
            break
          default:
            console.log('error')
        }
      }
      if (name) {
        switch (id) {
          case target:
            cb(e)
            break
          default:
            console.log('error')
        }
      }
    })
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

export default Event
