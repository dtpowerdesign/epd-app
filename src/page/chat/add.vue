<template>
  <div class="index">
    <x-header title="添加好友" :left-options="{preventGoBack: true}" @on-click-back="goback">
    </x-header>
    <group title="添加好友">
      <x-input v-model="form.value" placeholder="手机/邮箱/姓名" placeholder-align="right"
               @on-change="fetchFriendData(form.value)"></x-input>
    </group>
    <div class="results">
      <ul>
        <li v-for="(item, index) in searchLists" :key="index">
          <img :src="item.portraitUri" alt="">
          <span>{{ item.name }}</span>
          <x-input placeholder="请输入验证信息" placeholder-align="left" v-model="extraMsg"></x-input>
          <x-button type="primary" text="添加好友" :mini=true @click.native="sendFriendRequest(item)"></x-button>
        </li>
      </ul>
      <load-more tip="暂无数据" background-color="#fbf9fe" :show-loading="false" v-show="isShow"></load-more>
    </div>
  </div>
</template>
<script>
  import { XHeader, Group, XInput, XButton, LoadMore, Toast } from 'vux'
  export default {
    components: {
      XHeader,
      Group,
      XInput,
      XButton,
      LoadMore,
      Toast
    },
    data() {
      return {
        form: {
          value: ''
        },
        extraMsg: '',
        isShow: true,
        searchLists: []
      }
    },
    methods: {
      goback() {
        this.$router.goBack()
      },
      sendFriendRequest(item) {
        let sendForm = {}
        sendForm.fromUserId = localStorage.getItem('userId')
        sendForm.fromUserName = JSON.parse(localStorage.getItem('userMsg')).name
        sendForm.applyType = 'normal'
        sendForm.toUserId = item.account
        sendForm.toName = item.name
        sendForm.extraMsg = this.extraMsg
        this.$vux.loading.show({
          text: 'Loading'
        })
        this.$http
          .post(this.$domain + '/electric-design/applyNewFriend', sendForm)
          .then(res => {
            if (res.data.result) {
              this.$vux.loading.hide()
              this.$http.post(this.$domain + '/electric-design/private_publish', {
                'fromUserId': localStorage.getItem('userId'),
                'fromUserName': JSON.parse(localStorage.getItem('userMsg')).name,
                'toUserId': item.account,
                'toName': item.name,
                'objectName': 'RC:TxtMsg',
                'message': {content: '向您发送好友申请', extra: '系统消息'}
              })
                .then((res) => {
                  this.$vux.toast.show({
                    text: '申请发送成功,等待对方同意'
                  })
                  console.log('success')
                  this.extraMsg = ''
                }).catch((err) => {
                  console.log(err)
                })
            } else {
              console.log(res.data.reason)
            }
          })
          .catch(error => {
            console.log('Inside error, fetching product line items failed', error)
          })
      },
      fetchFriendData(value) {
        this.$vux.loading.show({
          text: 'Loading'
        })
        if (value === '') {
          this.searchLists = []
          this.isShow = true
          this.$vux.loading.hide()
          return false
        } else {
          this.$http
            .post(this.$domain + '/electric-design/searchAllUsersByValue', {
              value: value
            })
            .then(response => {
              console.log(response)
              this.searchLists = []
              this.$vux.loading.hide()
              if (response.data.length !== 0) {
                this.isShow = false
                response.data.forEach(item => {
                  this.searchLists.push(item)
                })
              } else {
                this.isShow = true
                return false
              }
            })
            .catch(error => {
              console.log(
                'Inside error, fetching product line items failed',
                error
              )
            })
        }
      }
    },
    mounted() {
      this.$one.test(this.$route.path)
    }
  }
</script>
<style scoped>
  .index {
    background-color: #f0f8ff;
    height: 100%;
    overflow: scroll;
  }

  .results {
    margin-top: 5px;
    background-color: #fff;
    padding: 5px 10px;
    box-shadow: 5px 5px 5px #fff;
  }

  .results li {
    margin-bottom: 2px;
    display: flex;
    align-items: center;
  }

  .results img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
</style>


