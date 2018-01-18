<template>
  <div class="box">
    <x-header class="header" title="企业注册" :left-options="{preventGoBack: true}"  @on-click-back="goback" ></x-header>
    <div class="wrapper">
      <h1>企业注册</h1>
      <group label-margin-right="1em" label-align="right">
        <x-input title="公司名称" v-model="company" placeholder="公司名称"></x-input>
        <x-input title="联系人" v-model="contactName" placeholder="联系人姓名"></x-input>
        <x-input title="电话" v-model="mobile" placeholder="手机号"></x-input>
        <x-input title="密码" v-model="password" type="password" placeholder="密码"></x-input>
        <x-input title="验证码" v-model="verify" class="weui-vcode" required>
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
      company: '',
      contactName: '',
      mobile: '',
      password: '',
      verify: ''
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
</style>


