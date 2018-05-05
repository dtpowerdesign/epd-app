<template>
  <div>
    <x-header class="header" title="服务商" :left-options="{preventGoBack: true}"  @on-click-back="goback" ></x-header>
    <load-more tip="暂无数据" background-color="#fbf9fe" :show-loading="false" v-show="isShow"></load-more>
  </div>
</template>
<script>
import { XHeader, LoadMore } from 'vux'
export default {
  components: {
    XHeader,
    LoadMore
  },
  methods: {
    goback() {
      this.$router.goBack()
    }
  },
  data() {
    return {
      isShow: true
    }
  },
  mounted() {
    this.$one.test(this.$route.path)
  }
}
</script>
<style scoped>

</style>


