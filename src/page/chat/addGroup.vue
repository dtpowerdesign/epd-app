<template>
  <div class="index">
    <x-header title="加入群组" :left-options="{preventGoBack: true}" @on-click-back="goback">
    </x-header>
    <group title="加入群组">
      <x-input v-model="form.value" placeholder="群账号/群名称" placeholder-align="right"
               @on-change="fetchFriendData(form.value)"></x-input>
    </group>
    <div class="results">
      <ul>
        <li v-for="(item, index) in searchLists" :key="index" class="searchLi">
          <ul style="text-align: center;">
            <li><span>群名称：</span><span style="text-align: right;">{{ item.groupName }}</span></li>
            <li><span>群ID：</span><span style="text-align: right;">{{ item.groupId }}</span></li>
            <li><span>群介绍：</span><span style="text-align: right;">{{ item.instraction }}</span></li>
            <li>
              <x-input placeholder="请输入验证信息" placeholder-align="left" v-model="extraMsg"></x-input>
              <x-button type="primary" style="text-align: center;" text="申请加入" :mini=true
                        @click.native="sendFriendRequest(item)"></x-button>
            </li>
          </ul>

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
        sendForm.applyType = 'group'
        sendForm.toGroupId = item.groupId
        sendForm.toName = item.groupName
        sendForm.extraMsg = this.extraMsg
        this.$vux.loading.show({
          text: 'Loading'
        })
        this.$http
          .post(this.$domain + '/electric-design/applyNewFriend', sendForm)
          .then(res => {
            if (res.data.result) {
              this.$vux.loading.hide()
              this.$http.post(this.$domain + '/electric-design/group_publish', {
                'fromUserId': localStorage.getItem('userId'),
                'fromUserName': JSON.parse(localStorage.getItem('userMsg')).name,
                'toUserId': item.groupId,
                'toName': item.groupName,
                'objectName': 'RC:TxtMsg',
                'message': {content: '请求加入群' + item.groupName, extra: '系统消息'}
              })
                .then((res) => {
                  this.$vux.toast.show({
                    text: `群申请发送成功,等待同意`
                  })
                  console.log('success')
                  this.extraMsg = ''
                })
            } else {
              this.$vux.toast.show({
                text: `发送失败,原因:${res.data.reason}`
              })
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
            .post(this.$domain + '/electric-design/searchTableByValue',
              {'table': 'chatgroup', 'value': this.form.value}
            )
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


