// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import 'animate.css'
import { LoadingPlugin, ToastPlugin } from 'vux'

FastClick.attach(document.body)

Vue.use(Vuex)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
