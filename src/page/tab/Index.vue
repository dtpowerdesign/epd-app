<template>
  <div>
    <header></header>
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
  </div>
</template>
<script>
import { Swiper } from 'vux'

const baseList = [
  {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/1.jpg',
    title: '送你一朵fua'
  },
  {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/2.jpg',
    title: '送你一辆车'
  },
  {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/5.jpg',
    title: '送你一次旅行',
    fallbackImg: 'https://static.vux.li/demo/3.jpg'
  }
]

export default {
  components: {
    Swiper
  },
  data() {
    return {
      demo01_list: baseList
    }
  },
  methods: {
    demo01_onIndexChange(index) {
      console.log('demo item change', index)
    }
  }
}
</script>
<style scoped>
header {
  height: 46px;
  width: 100%;
  background-color: #409EFF;
}
</style>

