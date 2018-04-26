<template>
  <div class="box">
    <x-header class="header" title="企业注册" :left-options="{preventGoBack: true}" @on-click-back="goback"></x-header>
    <div class="wrapper">
      <h1>企业注册</h1>
      <group label-margin-right="1em" label-align="right">
        <x-input title="账号" v-model="account" placeholder="账号"></x-input>
        <x-input title="密码" v-model="password" type="password" placeholder="密码"></x-input>
        <x-input title="公司名称" v-model="company" placeholder="公司名称"></x-input>
        <x-input title="联系人" v-model="contactName" placeholder="联系人姓名"></x-input>
        <x-input title="企业网站（可选）" v-model="website" placeholder="企业网站"></x-input>
        <x-input title="验证码" v-model="checkMsg" class="weui-vcode" required>
          <x-button slot="right" type="primary" mini @click.native="clickCheck" :text="text"
                    :disabled="isDisabled"></x-button>
        </x-input>
      </group>
      <x-button class="submit" type="primary" @click.native="submit">提交</x-button>
    </div>
  </div>
</template>
<script>
  import { Divider, Group, XInput, XButton, XHeader, AlertPlugin, Loading, Toast } from 'vux'
  import Vue from 'vue'
  Vue.use(AlertPlugin)
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
        account: '',
        company: '',
        contactName: '',
        website: '',
        password: '',
        checkMsg: '',
        text: '发送验证码',
        isDisabled: false,
        realCheckMsg: '-1s54afd54as4fa'
      }
    },
    methods: {
      goback() {
        this.$router.goBack()
      },
      clickCheck() {
        this.isDisabled = true
        let num = 30
        this.text = num + 's后重新获取'
        let timer = setInterval(() => {
          num--
          this.text = num + 's后重新获取'
          if (num === 0) {
            clearInterval(timer)
            this.isDisabled = false
            this.text = '发送验证码'
          }
        }, 1000)
        //----------------发送验证码
        this.$http.post(this.$domain + '/electric-design/sendCheckMsgByJson', {'testNumber': this.account})
          .then(response => {
            console.log(response)
            if (response.data.result === true) {
              this.realCheckMsg = response.data.checkMsg
              console.log(this.realCheckMsg)
            } else {
              this.$vux.alert.show({
                title: response.data.reason
              })
            }
          })
          .catch(error => {
            this.$vux.alert.show({
              title: error
            })
          })
      },
      submit() {
        if (this.checkMsg === this.realCheckMsg) {
          this.$http.post(this.$domain + '/electric-design/CRegister', {
            'account': this.account,
            'password': this.password,
            'checkMsg': this.checkMsg,
            'name': this.company,
            'website': this.website,
            'contacter': this.contactName
          })
            .then(response => {
              if (response.data.result === true) {
                this.$vux.loading.show({
                  text: '注册成功！ Loading'
                })
                this.$http
                  .post(this.$domain + '/electric-design/AllUserLogin',
                    {'account': this.account, 'password': this.password})
                  .then(response => {
                    if (response.data.result === true) {
                      setTimeout(() => {
                        this.$vux.loading.hide()
                        this.$vux.toast.text('登录成功!', 'top')
                        //路由跳转并初始化融云应用
                        this.$startInit(this.account, {
                          token: response.data.token
                        })
                        //获取用户信息
                        localStorage.setItem('role', response.data.role)
                        console.log(localStorage.getItem('role'))
                        this.$http.post(this.$domain + '/electric-design/getCuserByAccount', {
                          'account': this.account
                        })
                          .then(response => {
                            console.log(response.data)
                            localStorage.setItem('userMsg', JSON.stringify(response.data))
                            console.log('userMsg:' + localStorage.getItem('userMsg'))
                          })
                          .catch(error => console.log(error))
                        localStorage.setItem('userId', this.account)
                        this.$router.push('index/all')
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
              } else {
                this.$vux.alert.show({
                  title: response.data.reason
                })
              }
            })
            .catch(error => {
              this.$vux.alert.show({
                title: error
              })
            })
        } else {
          this.$vux.alert.show({
            title: '验证码错误，请重新输入！'
          })
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
</style>


