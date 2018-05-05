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
        <img slot="icon" src="../assets/add.png">
        <span slot="label">发布任务</span>
      </tabbar-item>
      <tabbar-item  link="/index/chat">
        <img slot="icon" src="../assets/atm.png">
        <span slot="label">消息</span>
      </tabbar-item>
      <!--<tabbar-item :badge="num" link="/index/chat" v-if="num === 'new'">-->
        <!--<img slot="icon" src="../assets/atm.png">-->
        <!--<span slot="label">消息</span>-->
      <!--</tabbar-item>-->
      <!--<tabbar-item link="/index/chat" v-if="num === '0'">-->
        <!--<img slot="icon" src="../assets/atm.png">-->
        <!--<span slot="label">消息</span>-->
      <!--</tabbar-item>-->
      <tabbar-item link="/index/profile">
        <img slot="icon" src="../assets/user.png">
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
      return {
        num: this.$apply
      }
    },
    methods: {},
    computed: {},
    mounted() {
//      setTimeout(() => {
//        this.num = 'new'
//      }, 2000)
//      this.$one.$on('hasApply', (message) => {
//        console.log('申请------------')
//        this.$apply = 'new'
//        setTimeout(() => {
//          this.num = this.$apply
//        }, 1000)
//        console.log(this.$apply)
//        console.log('-------------end----------')
//      })
    }
  }
</script>
<style scoped>
</style>

