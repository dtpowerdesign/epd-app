<template>
  <div class="box">
    <x-header class="header" title="个人注册" :left-options="{preventGoBack: true}"  @on-click-back="goback" ></x-header>
    <div class="wrapper">
      <h1>个人注册</h1>
      <group label-margin-right="1em" label-align="right">
        <x-input title="账户" v-model="username" type="tel" placeholder="手机号码" is-type="china-mobile" required=true></x-input>
        <x-input title="密码" v-model="password" min= 6 type="password" placeholder="密码" required=true></x-input>
        <x-input title="姓名" v-model="name" placeholder="姓名" is-type="china-name"></x-input>
        <x-input title="公司" v-model="company" placeholder="公司名称"></x-input>
        <x-input title="验证码" class="weui-vcode" required>
          <x-button slot="right" type="primary" mini>发送验证码</x-button>
        </x-input>
      </group>
      <x-button class="submit" type="primary">提交</x-button>
    </div>
  </div>
</template>
<script>
import { Divider, Group, XInput, XButton, XHeader } from 'vux'
export default {
  components: {
    Divider,
    Group,
    XInput,
    XButton,
    XHeader
  },
  data() {
    return {
      username: '',
      password: '',
      name: '',
      company: ''
    }
  },
  methods: {
    goback() {
      this.$router.goBack()
    }
  }
}
</script>
<style scoped>
h1 {
  font-weight: 100;
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
}
.wrapper {
  padding: 0 1em;
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 98%;
}
.submit {
  margin: 1em auto;
}
.footer {
  text-align: center;
}
</style>


