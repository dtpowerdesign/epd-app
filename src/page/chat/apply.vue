<template>
  <div class="main">
    <x-header>请求列表</x-header>
    <div class="content">
      <divider>我收到的</divider>
      <div v-for="(item, i) in List1" :key="i" class="list">
        <p class="list-content" v-if="item.applyType === 'normal'" style="color: #0000ff">请求加我为好友</p>
        <p class="list-content" v-if="item.applyType === 'group'" style="color: #0000ff">请求加入群</p>
        <p class="list-content">姓名：{{item.fromUserName}}</p>
        <p class="list-content">账号：{{item.fromUserId}}</p>
        <p class="list-content">验证消息：{{item.extraMsg}}</p>
        <div class="list-button" v-if="item.ApplyState === 'waiting'">
          <x-button mini type="primary" @click.native="agree(item)">同意</x-button>
          <x-button mini type="warn" @click.native="refuse(item)">拒绝</x-button>
          <x-button mini @click.native="ignore(item)">忽略</x-button>
        </div>
        <div class="list-state" v-if="item.ApplyState === 'agreed'" style="background-color: #24ff76;color:white;">
          已同意
        </div>
        <div class="list-state" v-if="item.ApplyState === 'refused'" style="background-color: #e64d41;color:white;">
          已拒绝
        </div>
        <div class="list-state" v-if="item.ApplyState === 'ignored'" style="background-color: #c3c6c3;color:white;">
          已忽略
        </div>
      </div>

      <divider>我发起的</divider>
      <div v-for="(item, i) in List2" class="list">
        <p class="list-content" v-if="item.applyType === 'normal'" style="color: #0000ff">申请添加好友</p>
        <p class="list-content" v-if="item.applyType === 'group'" style="color: #0000ff">申请加入群</p>
        <p class="list-content">姓名：{{item.toName}}</p>
        <p class="list-content">账号：{{item.toUserId}}</p>
        <p class="list-content">验证消息：{{item.extraMsg}}</p>
        <div class="list-state" v-if="item.ApplyState === 'agreed'" style="background-color: #24ff76;color:white;">
          已同意
        </div>
        <div class="list-state" v-if="item.ApplyState === 'refused'" style="background-color: #e64d41;color:white;">
          已拒绝
        </div>
        <div class="list-state" v-if="item.ApplyState === 'ignored'" style="background-color: #c3c6c3;color:white;">
          等待同意中
        </div>
        <div class="list-state" v-if="item.ApplyState === 'waiting'" style="background-color: #c3c6c3;color:white;">
          等待同意中
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { XHeader, Swipeout, SwipeoutItem, SwipeoutButton, Divider, Flexbox, FlexboxItem, XButton, Toast } from 'vux'
  export default {
    components: {
      XHeader,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      Divider,
      Flexbox,
      FlexboxItem,
      XButton,
      Toast
    },
    data() {
      return {
        List1: [],
        List2: []
      }
    },
    methods: {
      agree (row) {
        this.$http.post(this.$domain + '/electric-design/agreeFriend', {
          'code': row.code,
          'fromUserId': row.fromUserId,
          'fromUserName': row.fromUserName,
          'toUserId': row.toUserId,
          'toName': row.toName
        })
          .then((res) => {
            if (res.data.result) {
              this.$vux.toast.show({
                text: `已经接收${row.fromUserName}申请`,
                type: 'text'
              })
              this.initData()
            } else {
              this.$vux.toast.show({
                text: `接收${row.fromUserName}申请失败,原因:${res.data.reason}`,
                type: 'text'
              })
            }
          })
      },
      agreeGroup (row) {
        this.$http.post(this.$domain.domain1 + 'electric-design/join', {
          'userIds': [row.fromUserId],
          'groupId': row.toGroupId,
          'groupName': row.toName
        })
          .then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: `已经接收${row.fromUserName}申请`
              })
              this.initData()
            } else {
              this.$message({
                type: 'success',
                message: `接收${row.fromUserName}申请失败,原因:${res.data.reason}`
              })
            }
          })
      },
      refuse (row) {
        this.$http.post(this.$domain + '/electric-design/refuseOrIgnoreFriend', {
          'code': row.code,
          'fromUserId': row.fromUserId,
          'fromUserName': row.fromUserName,
          'toUserId': row.toUserId,
          'toName': row.toName,
          'operator': 'refused'
        })
          .then((res) => {
            if (res.data.result) {
              this.$vux.toast.show({
                text: `已经拒绝${row.fromUserName}申请`,
                type: 'text'
              })
              this.initData()
            } else {
              this.$vux.toast.show({
                text: `拒绝${row.fromUserName}申请失败,原因:${res.data.reason}`,
                type: 'text'
              })
            }
          })
      },
      refuseGroup (row) {
        this.$http.post(this.$domain.domain1 + 'electric-design/refuseOrIgnoreFriend', {
          'code': row.code,
          'fromUserId': row.fromUserId,
          'fromUserName': row.fromUserName,
          'operator': 'refused'
        })
          .then((res) => {
            if (res.data.result) {
              this.$message({
                type: 'success',
                message: `已经拒绝${row.fromUserName}申请`
              })
              this.initData()
            } else {
              this.$message({
                type: 'success',
                message: `拒绝${row.fromUserName}申请失败,原因:${res.data.reason}`
              })
            }
          })
      },
      ignore (row) {
        this.$http.post(this.$domain + '/electric-design/refuseOrIgnoreFriend', {
          'code': row.code,
          'fromUserId': row.fromUserId,
          'fromUserName': row.fromUserName,
          'toUserId': row.toUserId,
          'toName': row.toName,
          'operator': 'ignored'
        })
          .then((res) => {
            if (res.data.result) {
              this.$vux.toast.show({
                text: `已经忽略${row.fromUserName}申请`,
                type: 'text'
              })
              this.initData()
            } else {
              this.$vux.toast.show({
                text: `忽略${row.fromUserName}申请失败,原因:${res.data.reason}`,
                type: 'text'
              })
            }
          })
      },
      ignoreGroup (row) {
        this.$http.post(this.$domain.domain1 + 'electric-design/refuseOrIgnoreFriend', {
          'code': row.code,
          'fromUserId': row.fromUserId,
          'fromUserName': row.fromUserName,
          'operator': 'ignored'
        })
          .then((res) => {
            if (res.data.result) {
              this.$message({
                type: 'success',
                message: `已经忽略${row.fromUserName}申请`
              })
              this.initData()
            } else {
              this.$message({
                type: 'success',
                message: `忽略${row.fromUserName}申请失败,原因:${res.data.reason}`
              })
            }
          })
      },
      initData () {
        this.$http.post(this.$domain + '/electric-design/getfriendApplyList', {'userId': localStorage.getItem('userId')})
          .then((res) => {
            // console.log(res.data)
            this.List1 = []
            this.List2 = []
            res.data.forEach((el, index) => {
              if (el.fromUserId !== localStorage.getItem('userId')) {
                this.List1.push(el)
              } else {
                this.List2.push(el)
              }
            })
            this.List1.reverse()
            this.List2.reverse()
            console.log(this.List1)
            console.log(this.List2)
          })
      }
    },
    mounted() {
      this.initData()
    }
  }
</script>

<style scoped>
  .list {
    padding-top: 3px;
    width: 100%;
    height: 18%;
    background-color: white;
    border-bottom: 1px solid #dadada;
    position: relative;
  }

  .list-button {
    position: absolute;
    top: 3px;
    right: 0;
  }

  .list-content {
    margin-left: 10px;
    margin-bottom: 3px;
  }

  .list-state {
    width: 20%;
    height: 100%;
    background-color: #00a9b8;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
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

  .main {
    height: 100%;
    width: 100%;
    background-color: aliceblue;
  }

  .content {
    height: 80%;
    overflow: auto;
  }

  .vux-swipeout-content > div {
    display: flex;
    align-items: center;
  }
</style>
