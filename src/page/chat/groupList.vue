<template>
  <div class="main">
    <x-header>群聊列表</x-header>
    <divider v-show="show">暂无数据</divider>
    <div class="content">
      <div class="friendListDiv" v-for="(i, j) in data" :key="j">
        <div class="friendListDivDiv"><span style="min-width: 30%
">群名称:</span><span style="word-break: break-all">{{i.groupName}}</span></div>
        <div class="friendListDivDiv"><span style="min-width: 30%
">群账号:</span><span style="word-break: break-all">{{i.groupId}}</span></div>
        <div class="friendListDivDiv"><span style="min-width: 30%
">创建者:</span><span style="word-break: break-all">{{i.ownerId}}</span></div>
        <div class="friendListDivDiv"><span style="min-width: 30%
">群介绍:</span><span style="word-break: break-all">{{i.instraction}}</span></div>
        <div class="friendListDivDiv"><span style="min-width: 30%
">群成员:</span><span style="word-break: break-all">{{i.userIds.join(',')}}</span></div>
        <flexbox>
          <flexbox-item>
            <x-button @click.native="goChat(i)" type="primary">进入群聊</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button @click.native="myQuit(i.groupId, i.groupName)" type="warn" v-if="!(i.ownerId === userId)">退出群聊
            </x-button>
            <x-button @click.native="myDismiss(i.groupId, i.groupName)" type="warn" v-if="i.ownerId === userId">解散群聊
            </x-button>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader, XButton, Flexbox, FlexboxItem, Toast, Divider } from 'vux'
  export default{
    components: {
      XHeader,
      XButton,
      Flexbox,
      FlexboxItem,
      Toast,
      Divider
    },
    data() {
      return {
        data: [],
        show: true,
        userId: localStorage.getItem('userId')
      }
    },
    methods: {
      initData () {
        this.$http.post(this.$domain + '/electric-design/getAllGroupAboutUser', {'userId': localStorage.getItem('userId')})
          .then((res) => {
            if (res.data.length > 0) {
              this.show = false
            }
            console.log(res.data)
            this.data = res.data
          })
      },
      goChat(i) {
        this.$router.push({
          path: '/index/chat/mainGroup',
          query: {
            groupName: i.groupName,
            groupId: i.groupId
          }
        })
      },
      myDelete (account, name) {
        this.$http.post(this.$domain + '/electric-design/delFriend', {
          'fromUserId': localStorage.getItem('userId'),
          'toUserId': account
        })
          .then((res) => {
            if (res.data.result) {
              this.$vux.toast.show({
                text: `成功删除好友${name}`
              })
              this.initData()
            } else {
              this.$vux.toast.show({
                text: `删除好友${name}失败,原因:${res.data.reason}`
              })
            }
          })
      },
      myQuit (account, name) {
        this.$http.post(this.$domain + '/electric-design/quit', {
          'userIds': [localStorage.getItem('userId')],
          'groupId': account
        })
          .then((res) => {
            if (res.data.code === 200) {
              this.$vux.toast.show({
                text: `成功退出群${name}`
              })
              this.initData()
            } else {
              this.$vux.toast.show({
                text: `退出群${name}失败,原因:${res.data.code}`
              })
            }
          })
      },
      myDismiss (account, name) {
        this.$http.post(this.$domain + '/electric-design/dismiss', {
          'userIds': [localStorage.getItem('userId')],
          'groupId': account
        })
          .then((res) => {
            if (res.data.code === 200) {
              this.$vux.toast.show({
                text: `成功解散群${name}`
              })
              this.initData()
            } else {
              this.$vux.toast.show({
                text: `解散群${name}失败,原因:${res.data.code}`
              })
            }
          })
      }
    },
    mounted() {
      this.initData()
      this.$one.test(this.$route.path)
    }
  }
</script>

<style scoped>
  .main {
    height: 100%;
    background-color: #f0f8ff;
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
</style>
