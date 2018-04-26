<template>
  <div>
    <x-header>我的信息</x-header>
    <group v-if="role === 'puser'">
      <x-input title="昵称：" placeholder="请输入昵称" v-model="changedMsg.nickName" text-align="right"></x-input>
      <x-input title="年龄：" placeholder="请输入年龄" v-model="changedMsg.age" text-align="right"></x-input>
      <x-input title="工作地址：" placeholder="请输入详细地址" v-model="changedMsg.workingAddress" text-align="right"></x-input>
      <x-input title="手机号码：" placeholder="请输入手机号" is-type="china-mobile" v-model="changedMsg.telephone"></x-input>
      <x-input title="邮箱：" placeholder="请输入邮箱" is-type="email" v-model="changedMsg.email"></x-input>
    </group>

    <group v-if="role === 'cuser'">
      <x-input title="企业名称：" placeholder="请输入名称" v-model="cMsg.name" text-align="right"></x-input>
      <x-input title="办公地址：" placeholder="请输入地址" v-model="cMsg.officeAddress" text-align="right"></x-input>
      <x-input title="企业传真：" placeholder="请输入传真" v-model="cMsg.fax" text-align="right"></x-input>
      <x-input title="企业邮箱：" placeholder="请输入邮箱" is-type="email" v-model="cMsg.email"></x-input>
      <x-input title="企业网站：" placeholder="请输入网站" v-model="cMsg.website"></x-input>
      <x-input title="企业电话：" placeholder="请输入电话" v-model="cMsg.telephone"></x-input>
      <x-input title="默认联系人：" placeholder="请输入默认联系人" v-model="cMsg.contacter"></x-input>
    </group>
    <x-button text="保存" type="primary" class="button" @click.native="save"></x-button>
  </div>
</template>

<script>
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
        userMsg: JSON.parse(localStorage.getItem('userMsg')),
        role: localStorage.getItem('role'),
        changedMsg: {
          nickName: JSON.parse(localStorage.getItem('userMsg')).nickName,
          age: JSON.parse(localStorage.getItem('userMsg')).age,
          telephone: JSON.parse(localStorage.getItem('userMsg')).telephone,
          workingAddress: JSON.parse(localStorage.getItem('userMsg')).workingAddress,
          email: JSON.parse(localStorage.getItem('userMsg')).email
        },
        cMsg: {
          name: JSON.parse(localStorage.getItem('userMsg')).name,
          officeAddress: JSON.parse(localStorage.getItem('userMsg')).officeAddress,
          fax: JSON.parse(localStorage.getItem('userMsg')).fax,
          email: JSON.parse(localStorage.getItem('userMsg')).email,
          website: JSON.parse(localStorage.getItem('userMsg')).website,
          telephone: JSON.parse(localStorage.getItem('userMsg')).telephone,
          contacter: JSON.parse(localStorage.getItem('userMsg')).contacter
        }
      }
    },
    methods: {
      save() {
        if (this.role === 'puser') {
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
//                    console.log(response.data)
                    localStorage.setItem('userMsg', JSON.stringify(response.data))
                  })
                  .catch(error => console.log(error))
                this.$router.push('./index/profile')
//                this.$router.push('/myMsg')
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
        } else if (this.role === 'cuser') {
          this.$http.post(this.$domain + '/electric-design/changeCuserByAccount', {
            'account': localStorage.getItem('userId'),
            'data': this.cMsg
          })
            .then(response => {
              if (response.data.result === true) {
                this.$vux.alert.show({
                  title: '保存成功！'
                })
                //获取并更新用户信息
                this.$http.post(this.$domain + '/electric-design/getCuserByAccount', {
                  'account': localStorage.getItem('userId')
                })
                  .then(response => {
                    console.log(response.data)
                    localStorage.setItem('userMsg', JSON.stringify(response.data))
                  })
                  .catch(error => console.log(error))
                this.$router.push('./index/profile')
//                this.$router.push('/myMsg')
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
  }
</script>

<style scoped>
  .button {
    margin-top: 100px;
    width: 80%;
  }
</style>
