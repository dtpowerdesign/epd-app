<template>
    <div>
      <x-header>使用帮助</x-header>
      <p class="title">热点问题</p>
      <group  gutter="0" v-for="(cell,index) in cells" :key="index">
        <cell :title="cell.title" class="cell" @click.native="go(cell.title,cell.imgSrc)" :is-link="true"></cell>
      </group>
    </div>
</template>

<script>
  import { XHeader, Cell, Group } from 'vux'
  export default{
    methods: {
      go(pTitle, imgSrc) {
        this.$router.push({
          path: 'helpson',
          query: {
            pTitle: pTitle,
            imgSrc: imgSrc
          }
        })
      }
    },
    components: {
      XHeader,
      Cell,
      Group
    },
    data() {
      return {
        cells: [
            { title: '接单流程', imgSrc: '/src/assets/help.jpg' },
            { title: '发布任务流程', imgSrc: '/src/assets/help.jpg' },
            { title: '发单客户需开通会员流程', imgSrc: '/src/assets/help.jpg' },
            { title: 'APP新用户认证流程', imgSrc: '/src/assets/help.jpg' },
            { title: '注册好以后，显示不能接单？', imgSrc: '/src/assets/help.jpg' },
            { title: '注册的时候手机为何收不到验证码？', imgSrc: '/src/assets/help.jpg' }
        ]
      }
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
