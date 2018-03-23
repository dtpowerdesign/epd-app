<template>
  <div>
    <section>
      <img class="icon" src="../assets/logo白底和黑底.png" alt="logo">
      <x-button type="primary" link="/signin">登录</x-button>
      <x-button type="primary" link="/register_1">个人注册</x-button>
      <x-button type="primary" link="/register_2">企业注册</x-button>
    </section>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  components: {
    XButton
  },
  data() {
    return {}
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
