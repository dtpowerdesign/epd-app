import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/hello'
import SignIn from '../page/SignIn.vue'
import Register1 from '../page/Register1.vue'
import Register2 from '../page/Register2.vue'

import AllPage from '../page/tab/Index.vue'
import ProjectPage from '../page/tab/Project.vue'
import Release from '../page/tab/release.vue'
import ChatPage from '../page/tab/Chat.vue'
import ProfilePage from '../page/tab/Profile.vue'

//添加好友组件
import AddFriend from '../page/chat/add.vue'
//聊天界面
import MainChat from '../page/chat/main.vue'

import Index from '../components/Tab.vue'
import PageTransition from '../components/PageTransition.vue'

//---------------------
import suggestion from '../page/tab/tabson/suggestion.vue'
import Help from '../page/tab/tabson/help.vue'
import Helpson from '../page/tab/tabson/helpson.vue'
//-------------------
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
        },
        {
          path: '/suggestion',
          name: 'suggestion',
          component: suggestion
        },
        {
          path: '/help',
          name: 'help',
          component: Help
        },
        {
          path: '/helpson',
          name: 'helpson',
          component: Helpson
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
          path: 'release',
          component: Release
        },
        {
          path: 'chat',
          component: PageTransition,
          children: [
            {
              path: '',
              component: ChatPage
            },
            {
              path: 'add',  //TODO
              name: 'addfriend',
              component: AddFriend
            },
            {
              path: 'main', //TODO path
              name: 'mainchat',
              component: MainChat
            }
          ]
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
