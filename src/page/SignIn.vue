<template>
  <div class="box">
    <x-header class="header" title="登录" :left-options="{preventGoBack: true}"  @on-click-back="goback" ></x-header>
    <div class="wrapper">
      <h1>欢迎回来</h1>
      <group label-margin-right="3em" label-align="right">
        <x-input title="账户" v-model="submitForm.account" :min=6 placeholder="手机号/邮箱" required></x-input>
        <x-input title="密码" v-model="submitForm.password" :min=6 type="password" placeholder="密码" required></x-input>
      </group>
      <x-button class="submit" type="primary" @click.native="signIn">登录</x-button>
    </div>
    <footer class="footer">
      <divider>其他登录方式</divider>
      <div>短信验证码</div>
    </footer>
  </div>
</template>
<script>
import { Divider, Group, XInput, XButton, XHeader, Loading, Toast } from 'vux'
import { setTimeout } from 'timers'
export default {
  components: {
    Divider,
    Group,
    XInput,
    XButton,
    XHeader,
    Loading,
    Toast
  },
  data() {
    return {
      submitForm: {
        account: '',
        password: ''
      }
    }
  },
  methods: {
    goback() {
      this.$router.goBack()
    },
    signIn() {
      if (this.submitForm.account.length < 6 || this.submitForm.password < 6) {
        this.$vux.toast.text('信息不完整', 'top')
      } else {
        this.$http
          .post(this.$domain + '/electric-design/AllUserLogin', this.submitForm)
          .then(response => {
            this.$vux.loading.show({
              text: 'Loading'
            })
            if (response.data.result === true) {
              setTimeout(() => {
                this.$vux.loading.hide()
                this.$vux.toast.text('登录成功!', 'top')
                console.log(response.data)
                this.$startInit(this.submitForm.account, {
                  token: response.data.token
                })
                //路由跳转并初始化融云应用
              }, 2000)
            } else {
              setTimeout(() => {
                this.$vux.loading.hide()
                this.$vux.toast.show({
                  text: response.data.reason,
                  type: 'warn'
                })
              }, 2000)
            }
          })
          .catch(error => {
            console.log(
              'Inside error, fetching product line items failed',
              error
            )
          })
      }

      // if (this.username === 'admin' && this.password === 'admin') {
      //   this.$vux.loading.show({
      //     text: 'Loading'
      //   })
      //   setTimeout(() => {
      //     this.$vux.loading.hide()
      //     this.$router.push('index/all')
      //   }, 2000)
      // } else {
      //   this.$vux.toast.text('账号或密码错误')
      // }
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


