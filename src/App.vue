<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
html{
  font-size: 14px;
}
html,
body {
  height: 100%;
}
body {
  background-color: #fff;
}
#app {
  width: 100%;
  height: 100%;
}
input::-webkit-input-placeholder{
  text-align: right;
  color: #999999;
}
select::-webkit-input-placeholder{
  text-align: right;
  color: #999999;
}

//项目页面的图标下边距
.Project{
  .weui-grid__icon{
    margin: 0 auto .8rem!important;
}
}
</style>
