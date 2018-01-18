import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/hello'
import SignIn from '../page/SignIn.vue'
import Register1 from '../page/Register1.vue'
import Register2 from '../page/Register2.vue'

import AllPage from '../page/tab/Index.vue'
import ProjectPage from '../page/tab/Project.vue'
import ChatPage from '../page/tab/Chat.vue'
import ProfilePage from '../page/tab/Profile.vue'

import Index from '../components/Tab.vue'
import PageTransition from '../components/PageTransition.vue'

Vue.use(Router)
Router.prototype.goBack = function() {
  this.isBack = true
  window.history.go(-1)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageTransition',
      component: PageTransition,
      children: [
        {
          path: '',
          component: Hello
        },
        {
          path: '/signin',
          name: 'SignIn',
          component: SignIn
        },
        {
          path: '/register_1',
          name: 'Register1',
          component: Register1
        },
        {
          path: '/register_2',
          name: 'Register2',
          component: Register2
        }
      ]
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'all',
          name: 'tab1',
          component: AllPage
        },
        {
          path: 'project',
          name: 'tab2',
          component: ProjectPage
        },
        {
          path: 'chat',
          name: 'tab3',
          component: ChatPage
        },
        {
          path: 'profile',
          name: 'tab4',
          component: ProfilePage
        }
      ]
    }
  ]
})
