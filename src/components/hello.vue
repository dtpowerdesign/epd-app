<template>
  <div>
    <section>
      <img class="icon" src="../assets/logo-white.png" alt="logo">
      <x-button type="primary" link="/signin">登录</x-button>
      <x-button type="primary" link="/register_1">个人注册</x-button>
      <x-button type="primary" link="/register_2">企业注册</x-button>
    </section>
  </div>
</template>

<script>
  import { XButton, Toast } from 'vux'
  export default {
    components: {
      XButton,
      Toast
    },
    data() {
      return {}
    },
    methods: {
      initData() {
        if (localStorage.getItem('userId') && localStorage.getItem('userMsg') && localStorage.getItem('role')) {
          this.$vux.toast.show({
            type: 'success',
            text: '检测到您的账号自动为您登录！'
          })
          this.$router.push('/index/all')
        }
      }
    },
    mounted() {
      this.initData()
    }
  }
</script>

<style scoped>
  div {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #fff;
    padding: 0;
    justify-content: center;
    align-items: center;
  }

  section {
    width: 80%;
    text-align: center;
  }

  .icon {
    width: 200px;
    height: 200px;
  }
</style>
