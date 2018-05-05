<template>
  <div class="main">
    <x-header>好友列表</x-header>
    <divider v-show="show">暂无数据</divider>
    <div class="content">
      <div class="friendListDiv" v-for="(i, j) in data" :key="j">
        <div class="friendListDivDiv"><span style="min-width: 30%
">姓名:</span><span style="word-break: break-all">{{i.name}}</span></div>
        <div class="friendListDivDiv"><span style="min-width: 30%
">账号:</span><span style="word-break: break-all">{{i.account}}</span></div>
        <div class="friendListDivDiv"><span style="min-width: 30%
">账号类型:</span><span style="word-break: break-all">{{i.role}}</span></div>
        <div class="friendListDivDiv"><span style="min-width: 30%
">工作地点:</span><span style="word-break: break-all">{{i.workingAddress}}</span></div>
        <div class="friendListDivDiv"><span style="min-width: 30%
">联系电话:</span><span style="word-break: break-all">{{i.telephone}}</span></div>
        <div class="friendListDivDiv"><span style="min-width: 30%
">账邮箱号:</span><span style="word-break: break-all">{{i.email}}</span></div>
        <flexbox>
          <flexbox-item>
            <x-button @click.native="goChat(i)" type="primary">与他聊天</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button @click.native="myDelete(i.account,i.name)" type="warn">删除好友</x-button>
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
        show: true
      }
    },
    methods: {
      initData () {
        this.$http.post(this.$domain + '/electric-design/getFriendList', {'userId': localStorage.getItem('userId')})
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
          path: '/index/chat/main',
          query: {
            otherName: i.name,
            otherUserId: i.account,
            otherNamel: i.name
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
