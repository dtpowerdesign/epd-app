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

//---------------------
import suggestion from '../page/tab/tabson/suggestion.vue'
import Help from '../page/tab/tabson/help.vue'
import Helpson from '../page/tab/tabson/helpson.vue'
import interest from '../page/tab/tabson/interest.vue'
import evaluation from '../page/tab/tabson/evaluation.vue'
import myMsg from '../page/tab/tabson/myMsg.vue'
import changeMsg from '../page/tab/tabson/changeMsg.vue'
import perarchieve from '../page/project/perarchieve.vue'
import detail from '../page/project/detail.vue'
import bidInfo from '../page/project/bidInfo.vue'
import changeTableHead from '../page/project/changeTableHead.vue'
import total from '../page/project/total.vue'
import othertotal from '../page/project/othertotal.vue'
import percombo from '../page/project/percombo.vue'
//-------------------
Vue.use(Router)
Router.prototype.goBack = function () {
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
        },
        {
          path: '/interest',
          name: 'interest',
          component: interest
        },
        {
          path: '/evaluation',
          name: 'evaluation',
          component: evaluation
        },
        {
          path: '/myMsg',
          name: 'myMsg',
          component: myMsg
        },
        {
          path: 'changeMsg',
          name: changeMsg,
          component: changeMsg
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
                  path: 'perarchieve',
                  name: 'perarchieve',
                  component: perarchieve
                },
                {
                  path: 'percombo',
                  name: 'percombo',
                  component: percombo
                },
                {
                  path: 'total',
                  name: 'total',
                  component: total
                },
                {
                  path: 'othertotal',
                  naem: 'othertotal',
                  component: othertotal
                },
                {
                  path: 'detail',
                  name: 'detail',
                  component: detail
                },
                {
                  path: 'bidInfo',
                  name: 'bidInfo',
                  component: bidInfo
                },
                {
                  path: 'changeTableHead',
                  name: 'changeTableHead',
                  component: changeTableHead
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
