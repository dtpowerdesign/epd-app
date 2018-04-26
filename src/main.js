// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import 'animate.css'
import { LoadingPlugin, ToastPlugin } from 'vux'
import Axios from 'axios'

FastClick.attach(document.body)

Vue.use(Vuex)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.config.productionTip = false

const myRongIMLib = window.RongIMLib
const myRongIMClient = myRongIMLib.RongIMClient

Vue.prototype.$domain = 'http://39.106.34.156:8080'
// Vue.prototype.$domain = 'http://10.14.4.138:8080'
Vue.prototype.$RongIMLib = myRongIMLib
Vue.prototype.$RongIMClient = myRongIMClient
Vue.prototype.$Appkey = 'pvxdm17jpibfr'
Vue.prototype.$startInit = startInit
Vue.prototype.$http = Axios

const store = new Vuex.Store({
  state: {
    toUser: '',
    receiveMessages: []
  },
  mutations: {
    setToUserId(state, userId) {
      state.toUser = userId
    },
    addOneMessage(state, msg) {
      state.receiveMessages.push(msg)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

//注册自定义消息
function registerMessage (type, propertys) {
  let messageNmae = type //消息名称
  let objectName = 's:' + type //消息内置名称
  let mesasgeTag = new myRongIMLib.Message(true, true) //保存并计数

  myRongIMClient.registerMessageType(
    messageNmae,
    objectName,
    mesasgeTag,
    propertys
  )
}

function startInit (user, config, targetId) {
  let params = {
    appKey: 'pvxdm17jpibfr',
    token: config.token,
    navi: config.navi || ''
  }

  let userId = ''

  let callbacks = {
    getInstance(instance) {
      myRongIMLib.RongIMEmoji.init()
      let propertys = ['name', 'age', 'gender']
      registerMessage('PersonMessage', propertys)
    },
    getCurrentUser(userInfo) {
      console.log(userInfo.userId)
      userId = userInfo.userId
      console.log('链接成功；userid=' + userInfo.userId)
      //加入聊天室
    },
    receiveNewMessage: function (message) {
      //判断是否有 @ 自己的消息
      let mentionedInfo = message.content.mentionedInfo || {}
      let ids = mentionedInfo.userIdList || []
      for (let i = 0; i < ids.length; i++) {
        if (ids[i] === userId) {
          alert('有人 @ 了你！')
        }
      }
      // console.log('show1', message)
      console.log(message)
      let msg = {}
      msg.content = message.content
      msg.receivedTime = message.receivedTime
      msg.senderUserId = message.senderUserId
      store.state.receiveMessages.push(msg)
    }
  }

  init(params, callbacks)
}

function init (params, callbacks, modules) {
  let appKey = params.appKey
  let token = params.token
  let navi = params.navi || ''

  modules = module || {}

  let RongIMLib = modules.RongIMLib || myRongIMLib
  let RongIMClient = RongIMLib.RongIMClient
  let protobuf = modules.protobuf || null

  let config = {}

  //私有云切换navi导航，私有云格式 '120.92.10.214:8888'
  if (navi !== '') {
    config.navi = navi
  }

  //私有云切换api,私有云格式 '172.20.210.38:81:8888'
  let api = params.api || ''
  if (api !== '') {
    config.api = api
  }

  //support protobuf url + function
  if (protobuf != null) {
    config.protobuf = protobuf
  }

  RongIMLib.RongIMClient.init(appKey, null, config)

  let instance = RongIMClient.getInstance()

  RongIMClient.setConnectionStatusListener({
    onChanged(status) {
      console.log(status)
      switch (status) {
        case RongIMLib.ConnectionStatus['CONNECTED']:
        case 0:
          console.log('连接成功')
          callbacks.getInstance && callbacks.getInstance(instance)
          break

        case RongIMLib.ConnectionStatus['CONNECTING']:
        case 1:
          console.log('连接中')
          break

        case RongIMLib.ConnectionStatus['DISCONNECTED']:
        case 2:
          console.log('当前用户主动断开链接')
          break

        case RongIMLib.ConnectionStatus['NETWORK_UNAVAILABLE']:
        case 3:
          console.log('网络不可用')
          break

        case RongIMLib.ConnectionStatus['CONNECTION_CLOSED']:
        case 4:
          console.log('未知原因，连接关闭')
          break

        case RongIMLib.ConnectionStatus['KICKED_OFFLINE_BY_OTHER_CLIENT']:
        case 6:
          console.log('用户账户在其他设备登录，本机会被踢掉线')
          break

        case RongIMLib.ConnectionStatus['DOMAIN_INCORRECT']:
        case 12:
          console.log('当前运行域名错误，请检查安全域名配置')
          break
      }
    }
  })

  /**
   *  1.会话唯一性， conversationType + targetId
   *  2.消息体属性说明可参考：http://rongcloud.cn/docs/api/js/index.html
   */
  RongIMClient.setOnReceiveMessageListener({
    //接收到的消息
    onReceived(message) {
      //应判断消息类型
      console.log('新消息: ' + message.targetId)
      console.log('message type:', message.messageType)
      callbacks.receiveNewMessage && callbacks.receiveNewMessage(message)
    }
  })

  //开始连接
  RongIMClient.connect(token, {
    onSuccess(userId) {
      callbacks.getCurrentUser && callbacks.getCurrentUser({userId: userId})
      console.log('链接成功，用户id：' + userId)
    },
    onTokenIncorrect() {
      console.log('token无效')
    },
    onError(errorCode) {
      console.log(errorCode)
    }
  })
}
//物理返回键设置
//设备返回键//TODO
