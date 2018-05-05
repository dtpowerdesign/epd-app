<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { Toast } from 'vux'
  export default {
    components: {
      Toast
    },
    name: 'app',
    mounted() {
      this.$nextTick(() => {
        this.$startInit(localStorage.getItem('userId'), {token: JSON.parse(localStorage.getItem('userMsg')).token})
      })
      this.$one.$on('hasApply', (message) => {
        this.$vux.toast.show({
          type: 'text',
          text: '收到申请消息',
          time: 3000,
          position: 'top'
        })
//        console.log('申请')
        console.log(message)
      })
      this.$one.$on('has', (message) => {
        if (JSON.parse(message.content.extra).type === 'normal') {
          this.$vux.toast.show({
            type: 'text',
            text: `来自${JSON.parse(message.content.extra).otherName}的私聊信息`,
            time: 3000,
            position: 'top'
          })
        }
        if (JSON.parse(message.content.extra).type === 'group') {
          this.$vux.toast.show({
            type: 'text',
            text: `来自${JSON.parse(message.content.extra).otherName}的群信息`,
            time: 3000,
            position: 'top'
          })
        }
      })
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  html {
    font-size: 14px;
  }

  html,
  body {
    height: 100%;
  }

  body {
    background-color: #fff;
  }

  #app {
    width: 100%;
    height: 100%;
  }

  input::-webkit-input-placeholder {
    text-align: right;
    color: #999999;
  }

  //项目页面的图标下边距
  .Project {
    .weui-grid__icon {
      margin: 0 auto .8rem !important;
    }
  }
</style>
