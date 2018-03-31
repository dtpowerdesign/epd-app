<template>
    <div>
      <x-header>我的信息</x-header>
      <group>
        <x-input title="昵称：" placeholder="请输入昵称" v-model="changedMsg.nickName" text-align="right"></x-input>
        <x-input title="年龄：" placeholder="请输入年龄" v-model="changedMsg.age" text-align="right"></x-input>
        <x-input title="工作地址：" placeholder="请输入详细地址" v-model="changedMsg.workingAddress" text-align="right"></x-input>
        <x-input title="手机号码：" placeholder="请输入手机号" is-type="china-mobile" v-model="changedMsg.telephone"></x-input>
        <x-input title="邮箱：" placeholder="请输入邮箱" is-type="email" v-model="changedMsg.email"></x-input>
      </group>
      <x-button text="保存" type="primary" class="button" @click.native="save"></x-button>
    </div>
</template>

<script >
  import { XHeader, Cell, Group, XInput, XAddress, ChinaAddressV4Data, XButton, AlertPlugin } from 'vux'
  import Vue from 'vue'
  Vue.use(AlertPlugin)
  export default {
    components: {
      XHeader,
      Cell,
      Group,
      XInput,
      XAddress,
      ChinaAddressV4Data,
      XButton,
      AlertPlugin
    },
    data() {
      return {
        changedMsg: {
          nickName: JSON.parse(localStorage.getItem('userMsg')).nickName,
          age: JSON.parse(localStorage.getItem('userMsg')).age,
          telephone: JSON.parse(localStorage.getItem('userMsg')).telephone,
          workingAddress: JSON.parse(localStorage.getItem('userMsg')).workingAddress,
          email: JSON.parse(localStorage.getItem('userMsg')).email
        }
      }
    },
    methods: {
      save() {
        this.$http.post(this.$domain + '/electric-design/changePuserByAccount', {
          'account': localStorage.getItem('userId'),
          'data': this.changedMsg
        })
          .then(response => {
            if (response.data.result === true) {
              this.$vux.alert.show({
                title: '保存成功！'
              })
              //获取并更新用户信息
              this.$http.post(this.$domain + '/electric-design/getPuserByAccount', {
                'account': localStorage.getItem('userId')
              })
                .then(response => {
                  console.log(response.data)
                  localStorage.setItem('userMsg', JSON.stringify(response.data))
                })
                .catch(error => console.log(error))
              this.$router.push('./index/profile')
            } else {
              this.$vux.alert.show({
                title: '保存失败！'
              })
            }
          })
          .catch(error => {
            this.$vux.alert.show({
              title: error
            })
          })
      }
    }
  }
</script>

<style scoped>
.button{
  margin-top: 100px;
  width: 80%;
}
</style>
