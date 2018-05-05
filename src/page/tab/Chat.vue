<template>
  <div class="index">
    <x-header title="聊天" :left-options="{showBack: false}" :right-options="{showMore: true}"
              @on-click-more="showMenus = true">
    </x-header>
    <div class="content">
      <x-button @click.native="apply">申请列表</x-button>
      <x-button style="margin-top: 0" @click.native="friendList">好友列表</x-button>
      <x-button style="margin-top: 0" @click.native="groupList">群聊列表</x-button>
      <!--<div class="friendListDiv" v-for="(i, j) in data" :key="j">-->
      <!--<div class="friendListDivDiv"><span>姓名:</span><span>{{i.name}}</span></div>-->
      <!--<div class="friendListDivDiv"><span>账号:</span><span>{{i.account}}</span></div>-->
      <!--<flexbox>-->
      <!--<flexbox-item>-->
      <!--<x-button @click="open(i.account, i.name)" type="primary">发送信息</x-button>-->
      <!--</flexbox-item>-->
      <!--<flexbox-item>-->
      <!--<x-button @click="myDelete(i.account, i.name)" type="warn">删除好友</x-button>-->
      <!--</flexbox-item>-->
      <!--</flexbox>-->
      <!--</div>-->
      <div class="friendListDiv" v-for="(i, j) in recentMessage" :key="j">
        <div class="friendListDivDiv" v-if="i.msgToType === 'normal'"><span>姓名:</span><span>{{i.otherName}}</span></div>
        <div class="friendListDivDiv" v-if="i.msgToType === 'group'"><span>群名称:</span><span>{{i.otherName}}</span></div>
        <div class="friendListDivDiv" v-if="i.msgToType === 'normal'"><span>账号:</span><span>{{i.otherUserId}}</span>
        </div>
        <div class="friendListDivDiv" v-if="i.msgToType === 'group'"><span>群账号:</span><span>{{i.otherUserId}}</span>
        </div>
        <div class="friendListDivDiv"><span>时间:</span><span>
        {{i.msgTime.year + 1900}}/{{i.msgTime.month + 1}}/{{i.msgTime.date}}/{{i.msgTime.hours}}:{{i.msgTime.minutes}}:{{i.msgTime.seconds}}
      </span></div>
        <div class="friendListDivDiv">
          <span>内容:</span>
          <p style="color:#409EFF;word-break: break-all;" v-if="i.fromUserId === userId">我:{{i.message.content}}</p>
          <p style="color:#409EFF;word-break: break-all;" v-if="!(i.fromUserId === userId)">
            {{i.fromUserName}}:{{i.message.content}}</p>
        </div>
        <flexbox>
          <!--<el-button type="primary" @click="open(scope.row)" v-if="scope.row.msgToType === 'normal'">与他聊天</el-button>-->
          <!--<el-button type="primary" @click="open(scope.row)" v-if="scope.row.msgToType === 'group'">群聊天</el-button>-->
          <!--<el-button type="info" @click="chatDelete(scope.row)">删除</el-button>-->
          <flexbox-item>
            <x-button @click.native="goChat(i)" v-if="i.msgToType === 'normal'" type="primary">与他聊天</x-button>
            <x-button @click.native="goChat(i)" v-if="i.msgToType === 'group'" type="primary">群聊天</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button @click.native="chatDelete(i)" type="warn">删除消息</x-button>
          </flexbox-item>
        </flexbox>
      </div>
      <divider v-show="!recentMessage.length > 0">暂无数据</divider>
    </div>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="addFriend" show-cancel></actionsheet>
    </div>
  </div>
</template>
<script>
  import {
    XHeader,
    TransferDom,
    Actionsheet,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Divider,
    XButton,
    FlexboxItem,
    Flexbox,
    Toast
  } from 'vux'
  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Actionsheet,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Divider,
      XButton,
      FlexboxItem,
      Flexbox,
      Toast
    },
    data() {
      return {
        userId: localStorage.getItem('userId'),
        menus: {
          menu1: '添加好友',
          menu2: '加入群组',
          menu3: '创建群聊'
        },
        showMenus: false,
        recentMessage: []
      }
    },
    methods: {
      apply() {
        this.$router.push('chat/apply')
      },
      friendList() {
        this.$router.push('chat/friendList')
      },
      groupList() {
        this.$router.push('chat/groupList')
      },
      goChat(i) {
        if (i.msgToType === 'normal') {
          this.$router.push({
            path: '/index/chat/main',
            query: i
          })
        } else {
          this.$router.push({
            path: '/index/chat/mainGroup',
            query: {
              groupName: i.otherName,
              groupId: i.otherUserId
            }
          })
        }
      },
      initData () {
        this.$http.post(this.$domain + '/electric-design/getFriendList', {'userId': localStorage.getItem('userId')})
          .then((res) => {
            console.log(res.data)
            this.data = res.data
          })
      },
      chatIm(item) {
        let userId = item.otherUserId
        this.$store.commit('setToUserId', userId)
        this.$router.push('/index/chat/main')
      },
      fetchRecentMessage(userId) {
        this.$http.post(this.$domain + '/electric-design/sync', {userId: localStorage.getItem('userId')})
          .then((res) => {
            if (res.data.code === 200) {
//              this.$vux.toast.show({
//                text: '群消息同步成功'
//              })
            } else {
              this.$vux.toast.show({
                text: '群消息同步失败'
              })
            }
          }).catch((err) => { console.log(err) })
        this.$http
          .post(this.$domain + '/electric-design/getCurrentLinkMan', {
            userId: userId
          })
          .then(response => {
            if (response.status === 200) {
              let messageLists = response.data
              messageLists.forEach(element => {
                this.recentMessage.push(element)
              })
              console.log(this.recentMessage)
            } else {
              this.$vux.toast.text(response.statusText, 'top')
            }
          })
          .catch(error => {
            console.log('Inside error, fetching product line items failed', error)
          })
      },
      addFriend(menuKey, menuItem) {
        if (menuItem === '添加好友') {
          this.$router.push('/index/chat/add')
        } else if (menuItem === '加入群组') {
          this.$router.push('/index/chat/addGroup')
        } else {
          this.$router.push('/index/chat/createGroup')
        }
      },
      chatDelete (row) {
        this.$http.post(this.$domain + '/electric-design/delTableRecod', {
          'table': 'currentChat',
          'keyNames': ['belongToUser', 'otherUserId'],
          'keyValues': [this.userId, row.otherUserId]
        }).then((res) => {
          if (res.data.result) {
            this.$vux.toast.show({
              text: '聊天记录删除成功',
              type: 'text'
            })
            this.recentMessage = this.recentMessage.filter((i) => i.otherUserId !== row.otherUserId)
          } else {
            this.$vux.toast.show({
              text: `失败原因:${res.data.reason}`,
              type: 'text'
            })
            console.log(res.data)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      open (row) {
        if (row.msgToType === 'group') {
          this.dialogVisibleChat = false
          this.dialogVisibleChatGroup = true
          this.toUserId = row.otherUserId
          this.toName = row.otherName
          this.limit = 3
          this.getChatMsgGroup()
        } else {
          this.dialogVisibleChat = true
          this.dialogVisibleChatGroup = false
          this.toUserId = row.otherUserId
          this.toName = row.otherName
          this.limit = 3
          this.getChatMsg()
        }
      },
      getChatMsg (item) {
        this.$http.post(this.$domain + '/electric-design/getLimitChatMsgOfNormal', {
          'userId1': item.toUserId,
          'userId2': this.userId,
          count: 5,
          start: 0
        })
          .then((res) => {
            console.log(res.data)
//            this.ChatMsg = res.data
          })
      }
    },
    mounted() {
//      this.initData()
      this.fetchRecentMessage(localStorage.getItem('userId'))
      this.$one.path = this.$route.path
      console.log('路径测试')
      console.log(this.$one.path)
      this.$one.test(this.$route.path)
    }
  }
</script>
<style scoped>
  .index {
    height: 100%;
    background-color: aliceblue;
    overflow: scroll;
  }

  .content {
    height: 80%;
    overflow: auto;
  }

  .friendListDiv {
    width: 85%;
    margin: 1rem;
    padding: 1rem;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 60px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  }

  .friendListDivDiv {
    margin: 1rem 2rem;
    display: flex;
    justify-content: space-between;
  }

  .img-box {
    display: inline-block;
    width: 4em;
    height: 4em;
    border-radius: 2em;
    margin-right: 5px;
  }

  .vux-swipeout-item {
    border-bottom: 1px solid #dadada;
  }

  .vux-swipeout-content > div {
    display: flex;
    align-items: center;
  }
</style>

