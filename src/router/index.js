import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'
import Test from '@/components/test/test'
import Test1 from '@/components/test/test1'
import User from '@/components/user/UserManagement'
import Test3 from '@/components/test/test3'
import Index from '@/components/index/index'
import foodManagnement from '@/components/foods/foodManagement'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome,
      children: [
        {
          path: '/test',
          name: 'Test',
          component: Test
        },
        {
          path: '/test1',
          name: 'Test1',
          component: Test1
        },
        {
          path: '/user',
          name: 'User',
          component: User
        },
        {
          path: '/index',
          name: 'Index',
          component: Index
        },
        {
          path: '/foods',
          name: 'Foods',
          component: foodManagnement
        }
      ]
    },
    {
      path: '/test3',
      name: 'Test3',
      component: Test3
    }
  ]
})
