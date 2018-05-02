<template>
  <div class="main">
    <x-header>好友列表</x-header>
    <div class="content">
      <div class="friendListDiv" v-for="(i, j) in data" :key="j">
        <div class="friendListDivDiv"><span>姓名:</span><span>{{i.name}}</span></div>
        <div class="friendListDivDiv"><span>账号:</span><span>{{i.account}}</span></div>
        <div class="friendListDivDiv"><span>账号类型:</span><span>{{i.role}}</span></div>
        <div class="friendListDivDiv"><span>工作地点:</span><span>{{i.workingAddress}}</span></div>
        <div class="friendListDivDiv"><span>联系电话:</span><span>{{i.telephone}}</span></div>
        <div class="friendListDivDiv"><span>账邮箱号:</span><span>{{i.email}}</span></div>
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
  import { XHeader, XButton, Flexbox, FlexboxItem, Toast } from 'vux'
  export default{
    components: {
      XHeader,
      XButton,
      Flexbox,
      FlexboxItem,
      Toast
    },
    data() {
      return {
        data: []
      }
    },
    methods: {
      initData () {
        this.$http.post(this.$domain + '/electric-design/getFriendList', {'userId': localStorage.getItem('userId')})
          .then((res) => {
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
