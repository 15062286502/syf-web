import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Welcome from '@/components/Welcome'
import Test from '@/components/test'
import Test1 from '@/components/test1'
import User from '@/components/UserManagement'
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
    }
  ]
})
