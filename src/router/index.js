import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Login'
import Welcome from '@/components/Welcome'
import Test from '@/components/test'
import Test1 from '@/components/test1'
import User from '@/components/user/UserManagement'
import Test3 from '@/components/test3'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
