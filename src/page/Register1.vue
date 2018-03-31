<template>
  <div class="box">
    <x-header class="header" title="个人注册" :left-options="{preventGoBack: true}"  @on-click-back="goback" ></x-header>
    <div class="wrapper">
      <h1>个人注册</h1>
      <group label-margin-right="1em" label-align="right">
        <x-input title="账户" v-model="registerForm.username" :min=6 type="text" placeholder="账号" required></x-input>
        <x-input title="密码" v-model="registerForm.password" :min=6 type="password" placeholder="密码" required></x-input>
        <x-input title="姓名" v-model="registerForm.name" placeholder="姓名" is-type="china-name"></x-input>
        <x-input title="公司" v-model="registerForm.company" placeholder="公司名称"></x-input>
        <x-input title="验证码" class="weui-vcode" v-model="registerForm.checkCode" required>
          <x-button slot="right" type="primary" mini @click.native="sendCheckCode" :text='btnCountdown'></x-button>
        </x-input>
      </group>
      <x-button class="submit" type="primary" @click.native="register()">提交</x-button>
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
      registerForm: {
        username: '',
        password: '',
        name: '',
        company: '',
        checkCode: ''
      },
      receivedCode: '',

      Countdown: 0,
      timer: null
    }
  },
  methods: {
    goback() {
      this.$router.goBack()
    },
    register() {
      if (
        this.registerForm.username.length < 6 ||
        this.registerForm.password < 6 ||
        this.registerForm.checkCode === ''
      ) {
        this.$vux.toast.text('信息不完整', 'top')
      } else if (this.registerForm.checkCode !== this.receivedCode) {
        this.$vux.toast.text('验证码错误', 'top')
      } else {
        //注册请求
        this.$http
          .post(this.$domain + '/electric-design/PRegister', this.registerForm)
          .then(response => {
            if (response.data.result === true) {
              this.$vux.toast.text('注册成功', 'top')
            } else {
              this.$vux.toast.text(response.data.reason, 'top')
            }
          })
          .catch(error => {
            console.log(
              'Inside error, fetching product line items failed',
              error
            )
          })
      }
    },
    sendCheckCode() {
      const TIME_COUNT = 30
      if (this.registerForm.username && this.registerForm.username.length > 5) {
        this.Countdown = TIME_COUNT
        //按钮倒计时
        this.checkIsDisabled = true
        this.timer = setInterval(() => {
          if (this.Countdown > 0 && this.Countdown <= TIME_COUNT) {
            this.Countdown--
          } else {
            this.checkIsDisabled = !this.checkIsDisabled
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)

        //获取验证码
        this.$http
          .post(this.$domain + '/electric-design/sendCheckMsgByJson', {
            testNumber: this.registerForm.username
          })
          .then(response => {
            if (response.data.result === true) {
              this.receivedCode = response.data.checkMsg
              console.log(response.data.checkMsg)
            } else {
              this.$vux.toast.text('请求次数过多，请稍候再试', 'top')
            }
          })
          .catch(error => {
            console.log(
              'Inside error, fetching product line items failed',
              error
            )
          })
      } else {
        this.$vux.toast.text('信息不完整', 'top')
      }
    }
  },
  computed: {
    btnCountdown() {
      if (this.Countdown === 0) {
        return '发送验证码'
      } else {
        return this.Countdown + '...'
      }
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


