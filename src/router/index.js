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
//项目管理
import ProjectManage from '../page/project/manage.vue'
//项目信息
import ProjectInfo from '../page/project/info.vue'
//统计
import Statics from '../page/project/statics.vue'
//项目归档
import ProjectArchive from '../page/show/proarc.vue'
//服务商展示（归档）
import ServiceProvided from '../page/show/service.vue'
//新闻列表
import NewsArchive from '../page/show/news.vue'
import SigleNew from '../components/index/new.vue'

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
      // name: 'PageTransition',
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
      component: PageTransition,
      children: [
        {
          path: '',
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
              // name: 'tab2',
              component: PageTransition,
              children: [
                {
                  path: '',
                  component: ProjectPage
                },
                {
                  path: 'manage',
                  name: 'promanage',
                  component: ProjectManage
                },
                {
                  path: 'info',
                  name: 'projectinfo',
                  component: ProjectInfo
                },
                {
                  path: 'statics',
                  name: 'staticinfo',
                  component: Statics
                }
              ]
            },
            {
              path: 'release',
              component: Release
            },
            {
              path: 'chat',
              // name: 'tab3',
              component: PageTransition,
              children: [
                {
                  path: '',
                  component: ChatPage
                },
                {
                  path: 'add', //TODO
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
        },
        {
          path: 'proarc',
          component: ProjectArchive
        },
        {
          path: 'service',
          component: ServiceProvided
        },
        {
          path: 'news',
          component: PageTransition,
          children: [
            {
              path: '',
              component: NewsArchive
            },
            {
              path: 'detail',
              name: 'new',
              component: SigleNew
            }
          ]
        }
      ]
    }
  ]
})
