// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import store from '../store'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts // 将echarts存到Vue原型中
Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false
Axios.interceptors.request.use(
  config => {
    if (store.getToken()) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${store.getToken()}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })
Axios.interceptors.response.use(
  response => {
    if (response.data.code === '50000') {
      localStorage.clear()
      router.replace('/')
    }
    return response
  },
  err => {
    Vue.prototype.$message({
      type: 'error',
      message: '连接服务器异常'
    })
    return Promise.reject(err.response)
  })
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
