<template>
  <div>
    <x-header title="管理" :left-options="{showBack: false}"></x-header>
    <group-title>项目管理</group-title>
    <grid :cols="Cols">
      <grid-item label="个人业绩">
        <img slot="icon" src="../../assets/all.png">
      </grid-item>
      <grid-item label="发布新项目">
        <img slot="icon" src="../../assets/all.png">
      </grid-item>
      <grid-item label="联合体">
        <img slot="icon" src="../../assets/all.png">
      </grid-item>
    </grid>
    <group-title>项目信息</group-title>
    <grid :cols="Cols">
      <grid-item label="项目汇总">
        <img slot="icon" src="../../assets/all.png">
      </grid-item>
      <grid-item label="发布中">
        <img slot="icon" src="../../assets/all.png">
      </grid-item>
      <grid-item label="投标中">
        <img slot="icon" src="../../assets/all.png">
      </grid-item>
      <grid-item label="洽谈中">
        <img slot="icon" src="../../assets/all.png">
      </grid-item>
      <grid-item label="中标洽谈">
        <img slot="icon" src="../../assets/all.png">
      </grid-item>
      <grid-item label="执行中">
        <img slot="icon" src="../../assets/all.png">
      </grid-item>
      <grid-item label="合同中止">
        <img slot="icon" src="../../assets/all.png">
      </grid-item>
    </grid>
    <group-title>统计信息</group-title>
    <grid :cols="Cols">
      <grid-item label="时间统计">
        <img slot="icon" src="../../assets/all.png">
      </grid-item>
      <grid-item label="洽谈统计">
        <img slot="icon" src="../../assets/all.png">
      </grid-item>
      <grid-item label="资信统计">
        <img slot="icon" src="../../assets/all.png">
      </grid-item>
    </grid>
  </div>
</template>
<script>
import { XHeader, Grid, GridItem, GroupTitle } from 'vux'
export default {
  components: {
    XHeader,
    Grid,
    GridItem,
    GroupTitle
  },
  data() {
    return {
      Cols: 4
    }
  },
  methods: {
    test() {}
  },
  mounted() {}
}
</script>
<style scoped>

</style>

