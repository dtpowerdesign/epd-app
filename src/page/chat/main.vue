<template>
<div class="index">
  <x-header @on-click-back="goback" :title="toUser"></x-header>
  <div class="content-talk">
    <!-- <ul>
      <li class="clearfix" v-for="(talk, index) in getMessage" :key="index" :class="{'even':toUser!=talk.senderUserId,'odd':toUser==talk.senderUserId}">
        <span v-show="true" :id="index">{{getLocalTime(talk.receivedTime)}}</span>
        <img src="../../assets/logo.png" alt="" v-if="toUser!=talk.senderUserId">
        <img src="../../assets/user.png" alt="" v-else>
        <b></b>
        <div>
            <p>{{talk.content.content}}</p>
        </div>
      </li>
    </ul> -->

  </div>
  <group class="weui-cells_form">
    <x-input v-model="content" placeholder="" class="weui-vcode" @keyup.native="sendMessage($event)">
      <x-button slot="right" type="primary" mini text="发送" :show-loading="isLoading"></x-button>
    </x-input>
  </group>
</div>
</template>
<script>
import { XHeader, XInput, Group, XButton, Popover } from 'vux'
export default {
  components: {
    XHeader,
    XInput,
    Group,
    XButton,
    Popover
  },
  data() {
    return {
      // othername: '',
      talks: [],
      content: '',
      isLoading: false
    }
  },
  computed: {
    toUser() {
      return this.$store.state.toUser
    },
    getMessage() {
      return this.$store.state.receiveMessages
    }
  },
  methods: {
    goback() {
      console.log(this.$router)
      this.$router.goBack()
    },
    getLocalTime(timestamp) {
      let date = new Date(timestamp)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes
    },
    sendMessage(ev) {
      if (ev.keyCode === 13) {
        let sendData = {
          fromUserId: localStorage.getItem('userId'),
          fromUserName: '谢东磊',
          toUserId: this.toUser,
          toName: '陈开举',
          objectName: 'RC:TxtMsg',
          message: {
            content: this.content
          }
        }
        console.log(sendData)
        if (this.content !== '') {
          let msg = {
            content: {}
          }
          msg.content.content = this.content
          msg.receivedTime = new Date().getTime()
          msg.senderUserId = sendData.fromUserId
          this.isLoading = true
          this.$http
            .post(this.$domain + '/electric-design/private_publish', sendData)
            .then(response => {
              console.log(response)
              this.isLoading = false
              this.$store.commit('addOneMessage', msg)
            })
            .catch(error => {
              console.log(
                'Inside error, fetching product line items failed',
                error
              )
            })
        } else {
          this.$vux.toast.text('内容为空!', 'top')
        }
      }
    }
  }
}
</script>
<style scoped>
.index {
  height: 100%;
}
.weui-cells_form {
  position: absolute;
  width: 100%;
  bottom: 49.6px;
}
.content-talk {
  height: calc(100% - 125.6px);
  overflow: scroll;
}
</style>


