<template>
    <div>
      <x-header>我的信息</x-header>
      <group>
        <cell title="姓名：" :value="userMsg.name"></cell>
        <cell title="性别：" :value="realsex"></cell>
        <cell title="年龄：" :value="userMsg.age"></cell>
        <cell title="昵称：" :value="userMsg.nickName"></cell>
        <cell title="手机号码：" :value="userMsg.telephone"></cell>
        <cell title="邮箱：" :value="userMsg.email"></cell>
        <cell title="地址：" :value="userMsg.workingAddress"></cell>
      </group>
      <x-button text="更改信息" @click.native="changeMsg"  type="primary" class="button"></x-button>
    </div>
</template>

<script>
  import { XHeader, XButton, Previewer, Group, Cell } from 'vux'
  export default {
    components: {
      XHeader,
      XButton,
      Previewer,
      Group,
      Cell
    },
    methods: {
      changeMsg() {
        let data = localStorage.getItem('userId')
        let userMsg = JSON.parse(localStorage.getItem('userMsg'))
        console.log(data)
        console.log(userMsg)
        this.$router.push('/changeMsg')
      }
    },
    data() {
      return {
        userMsg: JSON.parse(localStorage.getItem('userMsg'))
      }
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
  .button{
    margin-top: 100px;
    width: 80%;
  }
</style>
