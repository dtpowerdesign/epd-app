<template>
  <div style="height:100%">
    <transition enter-active-class="animated fadeIn">
      <router-view></router-view>
    </transition>
    <tabbar>
      <tabbar-item selected link="/index/all">
        <img slot="icon" src="../assets/Category.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot link="/index/project">
        <img slot="icon" src="../assets/all.png">
        <span slot="label">项目</span>
      </tabbar-item>
      <tabbar-item link="/index/release">
        <img slot="icon" src="../assets/add.png" >
        <span slot="label">发布任务</span>
      </tabbar-item>
      <tabbar-item link="/index/chat">
        <img slot="icon" src="../assets/atm.png">
        <span slot="label">消息</span>
      </tabbar-item>
      <tabbar-item badge="2" link="/index/profile">
        <img slot="icon" src="../assets/account-filling.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {}
  },
  methods: {},
  computed: {}
}
</script>
<style scoped>
</style>

