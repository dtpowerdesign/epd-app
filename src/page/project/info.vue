<template>
<div class="index">
  <x-header class="header" title="项目信息" :left-options="{preventGoBack: true}"  @on-click-back="goback" ></x-header>
  <div style="height:44px;">
    <sticky scroll-box="vux_view_box_body" ref="sticky" :offset="46" :check-sticky-support="false">
      <tab :line-width="1">
        <tab-item selected>汇总</tab-item>
        <tab-item>投标中</tab-item>
        <tab-item>洽谈中</tab-item>
        <tab-item>中标洽谈</tab-item>
        <tab-item>执行中</tab-item>
        <tab-item>已完成</tab-item>
      </tab>
    </sticky>
  </div>
  <load-more tip="暂无数据" background-color="#fbf9fe" :show-loading="false" v-show="isShow"></load-more>
</div>
</template>
<script>
import { XHeader, Tab, TabItem, Sticky, LoadMore } from 'vux'
export default {
  components: {
    XHeader,
    Tab,
    TabItem,
    Sticky,
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
  }
}
</script>
<style scoped>
.index {
  height: 100%;
  overflow: scroll;
}
</style>


