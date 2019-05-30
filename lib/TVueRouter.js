// 自行实现VueRouter
let Vue
class TVueRouter {
  constructor (options) {
    // new TVueRouter时传入的参数
    this.$options = options
    // 路由表
    this.routeMap = {}
    // 当前的响应数据
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }
  
  static install (_vue) {
    Vue = _vue
    Vue.mixin({
      beforeCreate () {
        // 此处的this.$options 是new Vue()时传递的参数
        if (this.$options.router) {
          this.$options.router.init()
        }
      }
    })
  }
  
  init () {
  //   绑定事件
    this.bindEvent()
  //   初始化路由表
    this.initRouteMap()
  //   初始化 <router-link> <router-view> 组件
    this.initComponents()
  }
  
  // 绑定事件
  bindEvent () {

    window.addEventListener('load', this.hashChangeHandler.bind(this), false)
    window.addEventListener('hashchange', this.hashChangeHandler.bind(this), false)
  }
  
  // 初始化路由表
  initRouteMap () {
    this.$options.routes.forEach(item => {
      this.routeMap[item.path] = item
    })
  }
  
  initComponents () {
    const that = this
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        return h ('a', {
          attrs: {
            href: '#' + this.to
          }
        }, [
          this.$slots.default
        ])
      },
    })
    
    Vue.component('router-view', {
      render (h) {
        if (!that.routeMap[that.app.current]) {
          return
        }
        let component = that.routeMap[that.app.current].component
        return h (component)
      }
    })
  }
  
  hashChangeHandler (e) {
    // eslint-disable-next-line
    let {from, to} = this.getFromTo(e)
    const route = this.routeMap[to]
    if (route && route.beforeEnter && typeof route.beforeEnter === 'function') {
      route.beforeEnter(from, to, () => {
        this.app.current = this.getPath(location.href)
      })
    } else {
      this.app.current = this.getPath(location.href)
    }
  }
  
  // 获取#后面的字符串 作为path值
  getPath (url) {
    return url.split('#')[1]
  }
  // 根据当前hash change事件，获取from和to的值
  getFromTo (e) {
    let from, to
    if (e.newURL) {
      from = this.getPath(e.oldURL)
      to = this.getPath(e.newURL)
    } else {
      from = ''
      to = this.getPath(location.href)
    }
    return {from, to}
  }
}

export default TVueRouter