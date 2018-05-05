<template>
  <div>
    <x-header>我的信息</x-header>
    <group v-if="role === 'puser'">
      <cell title="姓名：" :value="userMsg.name"></cell>
      <cell title="性别：" :value="realsex"></cell>
      <cell title="年龄：" :value="userMsg.age"></cell>
      <cell title="昵称：" :value="userMsg.nickName"></cell>
      <cell title="手机号码：" :value="userMsg.telephone"></cell>
      <cell title="邮箱：" :value="userMsg.email"></cell>
      <cell title="地址：" :value="userMsg.workingAddress"></cell>
    </group>
    <group v-if="role === 'cuser'">
      <cell title="企业名称：" :value="userMsg.name"></cell>
      <cell title="办公地址：" :value="userMsg.officeAddress"></cell>
      <cell title="企业传真：" :value="userMsg.fax"></cell>
      <cell title="企业邮箱：" :value="userMsg.email"></cell>
      <cell title="企业网站：" :value="userMsg.website"></cell>
      <cell title="企业电话：" :value="userMsg.telephone"></cell>
      <cell title="默认联系人：" :value="userMsg.contacter"></cell>
    </group>
    <x-button text="更改信息" @click.native="changeMsg" type="primary" class="button"></x-button>
  </div>
</template>

<script>
  import { XHeader, XButton, Previewer, Group, Cell, Loading } from 'vux'
  export default {
    components: {
      XHeader,
      XButton,
      Previewer,
      Group,
      Cell,
      Loading
    },
    methods: {
      changeMsg() {
//        let data = localStorage.getItem('userId')
//        let userMsg = JSON.parse(localStorage.getItem('userMsg'))
//        console.log(data)
//        console.log(userMsg)
        this.$router.push('/changeMsg')
      },
      initData() {
        this.$vux.loading.show({
          text: '加载中'
        })
        if (this.role === 'puser') {
          this.$http.post(this.$domain + '/electric-design/getPuserByAccount', {
            'account': localStorage.getItem('userId')
          })
            .then(response => {
              localStorage.setItem('userMsg', JSON.stringify(response.data))
              this.$vux.loading.hide()
            })
            .catch(error => console.log(error))
        } else if (this.role === 'cuser') {
          this.$http.post(this.$domain + '/electric-design/getCuserByAccount', {
            'account': localStorage.getItem('userId')
          })
            .then(response => {
              localStorage.setItem('userMsg', JSON.stringify(response.data))
              this.$vux.loading.hide()
            })
            .catch(error => console.log(error))
        }
      }
    },
    data() {
      return {
        userMsg: JSON.parse(localStorage.getItem('userMsg')),
        role: localStorage.getItem('role')
      }
    },
    mounted() {
      this.initData()
      this.$one.test(this.$route.path)
    },
    computed: {
      realsex() {
        if (this.userMsg.sex === '') {
          return '暂无数据'
        } else {
          return this.userMsg.sex
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
