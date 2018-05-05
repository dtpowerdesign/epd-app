<template>
  <div class="Project">
    <x-header title="管理" :left-options="{showBack: false}"></x-header>
    <group-title>项目管理</group-title>
    <grid :cols="Cols">
      <grid-item label="个人业绩" link="/index/project/perarchieve" v-if="role === 'puser'">
        <i class="icon iconfont icon-yejiguanli" slot="icon"></i>
        <!-- <img slot="icon" src="../../assets/all.png"> -->
      </grid-item>
      <grid-item label="企业业绩" link="/index/project/perarchieve" v-if="role === 'cuser'">
        <i class="icon iconfont icon-yejiguanli" slot="icon"></i>
        <!-- <img slot="icon" src="../../assets/all.png"> -->
      </grid-item>
      <grid-item label="发布新项目" link="/index/release">
        <i class="icon iconfont icon-fabu" slot="icon"></i>
        <!-- <img slot="icon" src="../../assets/all.png"> -->
      </grid-item>
      <grid-item label="联合体" link="/index/project/percombo">
        <i class="icon iconfont icon-woshou" slot="icon"></i>
        <!-- <img slot="icon" src="../../assets/all.png"> -->
      </grid-item>
    </grid>
    <group-title>项目信息</group-title>
    <grid :cols="Cols">
      <grid-item label="汇总" link="/index/project/total">
        <i class="icon iconfont icon-jiankangjianchajieguohuizong" slot="icon"></i>
        <!-- <img slot="icon" src="../../assets/all.png"> -->
      </grid-item>
      <grid-item label="发布中" @click.native="go('发布中')">
        <i class="icon iconfont icon-carry-out" slot="icon"></i>
      </grid-item>
      <grid-item label="投标中" @click.native="go('投标中')">
        <i class="icon iconfont icon-toubiao" slot="icon"></i>
        <!-- <img slot="icon" src="../../assets/all.png"> -->
      </grid-item>
      <grid-item label="招标中" @click.native="go('招标中')">
        <i class="icon iconfont icon-talkconversation" slot="icon"></i>
        <!-- <img slot="icon" src="../../assets/all.png"> -->
      </grid-item>
      <grid-item label="洽谈中" @click.native="go('洽谈中')">
        <i class="icon iconfont icon-talkconversation" slot="icon"></i>
        <!-- <img slot="icon" src="../../assets/all.png"> -->
      </grid-item>
      <grid-item label="中标洽谈" @click.native="go('投标洽谈')">
        <i class="icon iconfont icon-zhaopinqiatan" slot="icon"></i>
        <!-- <img slot="icon" src="../../assets/all.png"> -->
      </grid-item>
      <grid-item label="合同执行中" @click.native="go('合同执行中')">
        <i class="icon iconfont icon-jinxingzhong" slot="icon"></i>
        <!-- <img slot="icon" src="../../assets/all.png"> -->
      </grid-item>
      <grid-item label="合同终止" @click.native="go('合同终止')">
        <i class="icon iconfont icon-zhongzhi" slot="icon"></i>
        <!-- <img slot="icon" src="../../assets/all.png"> -->
      </grid-item>
    </grid>
    <!-- <group-title>统计信息</group-title>
    <grid :cols="Cols">
      <grid-item label="时间统计" link="/index/project/statics">
        <i class="icon iconfont icon-shijian" slot="icon"></i>
      </grid-item>
      <grid-item label="洽谈统计">
        <i class="icon iconfont icon-jishuhezuoqiatanhezuohuitan" slot="icon"></i>
      </grid-item>
      <grid-item label="资信统计">
        <i class="icon iconfont icon-1" slot="icon"></i>
      </grid-item>
    </grid> -->
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
        Cols: 4,
        role: localStorage.getItem('role')
      }
    },
    methods: {
      go(title) {
        this.$router.push({
          path: 'project/othertotal',
          query: {
            title: title
          }
        })
      }
    },
    mounted() {
      this.$one.path = this.$route.path
      console.log('路径测试')
      console.log(this.$one.path)
      this.$one.test(this.$one.path)
    }
  }
</script>
<style scoped>
  .icon {
    font-size: 2rem;
    color: #409eff;
  }
</style>

