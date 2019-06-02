import Vue from 'vue'
import App from './App.vue'
import pageA from './components/pageA'
import pageB from './components/pageB'
import TVueRouter from '../lib/TVueRouter'

Vue.use(TVueRouter)
Vue.config.productionTip = false

const routes = [
  {
    path: 'pageA',
    component: pageA,
    // 路由守卫的测试， 延迟2秒后再进入'pageA'
    beforeEnter (from, to, next) {
      setTimeout(() => {
        next()
      }, 2000)
    }
  },
  {
    path: 'pageB',
    component: pageB
  }
]

const router = new TVueRouter({
  routes // (缩写) 相当于 routes: routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
