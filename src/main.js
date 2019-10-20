// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import store from '../store'
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let isLogin = store.fetch()
  if (to.path === '/login') {
    next()
  } else if (isLogin === null || isLogin.length === 0) {
    next({path: '/login'})
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
