<template>
  <div class="index">
    <x-header @on-click-back="goback" :title="title"></x-header>
    <div class="content-talk">
      <p @click="limit+=10;getChatMsg()" style="color:#409EFF;text-align: center;">显示更多</p>
      <div class="chatContent">
        <div v-for="(i, j) in ChatMsg" :key="j" style="margin-top: 2rem;">
          <div style="color:#409EFF">
            <div v-if="i.fromUserId===userId" style="text-align:right">{{i.msgTime.year + 1900}}/{{i.msgTime.month + 1}}/{{i.msgTime.date}}/{{i.msgTime.hours}}:{{i.msgTime.minutes}}:{{i.msgTime.seconds}}</div>
            <div v-if="!(i.fromUserId===userId)" style="text-align:left">{{i.msgTime.year + 1900}}/{{i.msgTime.month + 1}}/{{i.msgTime.date}}/{{i.msgTime.hours}}:{{i.msgTime.minutes}}:{{i.msgTime.seconds}}</div>
          </div>
          <div v-if="!(i.fromUserId===userId)">
            {{i.fromUserName}}:<p style="text-align:left;">{{i.message.content}}</p>
          </div>

          <div v-if="i.fromUserId===userId" style="text-align: right;">
            <p>{{i.fromUserName}}:</p>
            <p>{{i.message.content}}</p>
          </div>
        </div>
      </div>

    </div>
    <group class="weui-cells_form">
      <x-input v-model="message" placeholder="" class="weui-vcode" @keyup.native="sendMessage($event)">
        <x-button slot="right" type="primary" mini text="发送" :show-loading="isLoading" @click.native="send"></x-button>
      </x-input>
    </group>
  </div>
</template>
<script>
  import { XHeader, XInput, Group, XButton, Popover, Toast } from 'vux'
  export default {
    components: {
      XHeader,
      XInput,
      Group,
      XButton,
      Popover,
      Toast
    },
    data() {
      return {
        // othername: '',
        talks: [],
        message: '',
        isLoading: false,
        title: this.$route.query.otherName,
        userId: localStorage.getItem('userId'),
        userName: JSON.parse(localStorage.getItem('userMsg')).name,
        ChatMsg: [],
        toUserId: this.$route.query.otherUserId,
        toName: this.$route.query.otherNamel,
        limit: 3
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
      send () {
        if (this.message === '') {
          this.$vux.toast.show({
            text: '该条消息为空哦',
            type: 'text'
          })
        } else {
          this.$http.post(this.$domain + '/electric-design/private_publish', {
            'fromUserId': this.userId,
            'fromUserName': this.userName,
            'toUserId': this.toUserId,
            'toName': this.toName,
            'objectName': 'RC:TxtMsg',
            'message': {
              content: this.message,
              extra: {'name': this.userName, 'type': 'normal', 'otherName': this.userName}
            }
          })
            .then((res) => {
              if (res.data.code === 200) {
                this.ChatMsg.push({
                  'fromUserId': this.userId,
                  'fromUserName': this.userName,
                  'msgTime': {
                    date: new Date().getDate(),
                    day: new Date().getDay(),
                    month: new Date().getMonth(),
                    hours: new Date().getHours(),
                    minutes: new Date().getMinutes(),
                    seconds: new Date().getSeconds(),
                    year: new Date().getYear()
                  },
                  'message': {
                    content: this.message
                  }
                })
//                this.data = this.data.filter((i) => i.otherUserId !== this.toUserId)
//                this.data.push({
//                  'otherName': this.toName,
//                  'otherUserId': this.toUserId,
//                  'fromUserId': this.userId,
//                  'fromUserName': this.userName,
//                  'msgTime': { date: new Date().getDate(),
//                    day: new Date().getDay(),
//                    month: new Date().getMonth(),
//                    hours: new Date().getHours(),
//                    minutes: new Date().getMinutes(),
//                    seconds: new Date().getSeconds(),
//                    year: new Date().getYear()},
//                  'message': {
//                    content: this.message
//                  },
//                  'msgToType': 'normal',
//                  'belongToUser': this.userId
//                })
//                this.$nextTick(() => {
//                  $('.chatContent').animate({
//                    scrollTop: $('.chatContent')[0].scrollHeight
//                  }, 1000)
//                })
                this.$nextTick(() => {
                  let contentTalk = document.getElementsByClassName('content-talk')[0]
                  contentTalk.scrollTo(0, contentTalk.scrollHeight)
                })
                this.message = ''
              } else {
                this.$vux.toast.show({
                  type: 'warn',
                  text: `发送失败${res.data.code}`
                })
              }
            })
        }
      },
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
      },
      getChatMsg (item) {
        this.$http.post(this.$domain + '/electric-design/getLimitChatMsgOfNormal', {
          'userId1': this.toUserId,
          'userId2': this.userId,
          count: this.limit,
          start: 0
        })
          .then((res) => {
            console.log(res.data)
            this.ChatMsg = res.data
//            this.$nextTick(() => {
//              let contentTalk = document.getElementsByClassName('content-talk')[0]
//              contentTalk.scrollTo(0, contentTalk.scrollHeight)
//            })
          })
      },
      initData() {
        console.log(this.$route.query)
        this.getChatMsg(this.$route.query)
        this.$nextTick(() => {
          let contentTalk = document.getElementsByClassName('content-talk')[0]
          contentTalk.scrollTo(0, contentTalk.scrollHeight)
        })
      }
    },
    mounted() {
      this.initData()
      this.$one.$on('refresh', (message) => {
        if (message.targetId === this.toUserId) {
          this.ChatMsg.push({
            'fromUserId': message.senderUserId,
            'fromUserName': this.title,
            'msgTime': {
              date: new Date().getDate(),
              day: new Date(message.receivedTime).getDay(),
              month: new Date(message.receivedTime).getMonth(),
              hours: new Date(message.receivedTime).getHours(),
              minutes: new Date(message.receivedTime).getMinutes(),
              seconds: new Date(message.receivedTime).getSeconds(),
              year: new Date(message.receivedTime).getYear()
            },
            'message': {
              content: message.content.content
            }
          })
          this.$nextTick(() => {
            let contentTalk = document.getElementsByClassName('content-talk')[0]
            contentTalk.scrollTo(0, contentTalk.scrollHeight)
          })
        }
//        if (JSON.parse(message.content.extra).type === 'normal') {
//          this.data = this.data.filter((i) => i.otherUserId !== message.targetId)
//          this.data.push({
//            'otherName': JSON.parse(message.content.extra).otherName,
//            'otherUserId': message.targetId,
//            'fromUserId': message.senderUserId,
//            'fromUserName': JSON.parse(message.content.extra).name,
//            'msgTime': { date: new Date().getDate(),
//              day: new Date().getDay(),
//              month: new Date().getMonth(),
//              hours: new Date().getHours(),
//              minutes: new Date().getMinutes(),
//              seconds: new Date().getSeconds(),
//              year: new Date().getYear()},
//            'message': {
//              content: message.content.content
//            },
//            'msgToType': 'normal'
//          })
//        }
//        if (JSON.parse(message.content.extra).type === 'group') {
//          this.data = this.data.filter((i) => i.otherUserId !== message.targetId)
//          this.data.push({
//            'otherName': JSON.parse(message.content.extra).otherName,
//            'otherUserId': message.targetId,
//            'fromUserId': message.senderUserId,
//            'fromUserName': JSON.parse(message.content.extra).name,
//            'msgTime': { date: new Date().getDate(),
//              day: new Date().getDay(),
//              month: new Date().getMonth(),
//              hours: new Date().getHours(),
//              minutes: new Date().getMinutes(),
//              seconds: new Date().getSeconds(),
//              year: new Date().getYear()},
//            'message': {
//              content: message.content.content
//            },
//            'msgToType': 'group'
//          })
//        }
      })
    }
  }
</script>
<style scoped>
  .index {
    height: 100%;
    background-color: #f0f8ff;
  }

  .weui-cells_form {
    position: absolute;
    width: 100%;
    bottom: 49.6px;
  }

  .content-talk {
    margin: 10px;
    /*height: calc(100% - 125.6px);*/
    height: 75%;
    overflow: scroll;
    background-color: #f0f8ff;

  }
</style>


