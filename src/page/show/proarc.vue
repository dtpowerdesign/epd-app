<template>
  <div>
    <x-header class="header" title="任务列表" :left-options="{preventGoBack: true}"  @on-click-back="goback" ></x-header>
    <pull-to :top-load-method="refresh">

    </pull-to>
    <load-more tip="暂无数据" background-color="#fbf9fe" :show-loading="false" v-show="isShow"></load-more>
  </div>
</template>
<script>
import { XHeader, LoadMore } from 'vux'
//下拉插件
import PullTo from 'vue-pull-to'
export default {
  components: {
    XHeader,
    LoadMore,
    PullTo
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
  }
}
</script>
<style scoped>
.vux-header {
  position: relative;
  z-index: 999;
}
</style>


