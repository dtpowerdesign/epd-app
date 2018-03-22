<template>
    <div>
      <x-header>使用帮助</x-header>
      <p class="title">热点问题</p>
      <group  gutter="0">
        <cell title="接单流程" class="cell" link="/help0"></cell>
        <cell title="发布任务流程" class="cell" link="/help1"></cell>
        <cell title="发单客户需开通会员流程" class="cell" link="/help2"></cell>
        <cell title="APP新用户认证流程" class="cell" link="/help3"></cell>
        <cell title="注册好以后，显示不能接单？" class="cell" link="/help4"></cell>
        <cell title="注册的时候手机为何收不到验证码？" class="cell" link="/help5"></cell>
      </group>
    </div>
</template>

<script>
  import { XHeader, Cell, Group } from 'vux'
  export default{
    components: {
      XHeader,
      Cell,
      Group
    }
  }
</script>

<style scoped>
.title{
  padding: 10px;
  background-color: #f8f8f8;
}
  .cell{
    font-size:14px;
  }
</style>
