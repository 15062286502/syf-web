import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Welcome from '@/components/Welcome'
import Test from '@/components/test/test'
import Test1 from '@/components/test/test1'
import User from '@/components/user/UserManagement'
import Test3 from '@/components/test/test3'
Vue.use(Router)

export default new Router({
  routes: [
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
