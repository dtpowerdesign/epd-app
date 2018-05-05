<template>
  <div>
    <x-header class="header" title="新闻列表" :left-options="{preventGoBack: true}"  @on-click-back="goback" ></x-header>
    <pull-to :top-load-method="refresh">
      <div style="margin: 10px;overflow: hidden;" v-for="(item, index) in list" :key="index" @click="goNewDetail(index)">
        <masker style="border-radius: 2px;">
          <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
          <div slot="content" class="m-title">
            {{item.title}}
            <br/>
            <span class="m-time">2016-03-18</span>
          </div>
        </masker>
      </div>
    </pull-to>
    <load-more tip="暂无数据" background-color="#fbf9fe" :show-loading="false" v-show="isShow"></load-more>
  </div>
</template>
<script>
import { XHeader, LoadMore, Masker } from 'vux'
//下拉插件
import PullTo from 'vue-pull-to'
export default {
  components: {
    XHeader,
    LoadMore,
    Masker,
    PullTo
  },
  methods: {
    goback() {
      this.$router.goBack()
    },
    goNewDetail(arg) {
      let num = this.list[arg].code
      this.$router.push({ name: 'new', params: { id: num } })
    },
    refresh(loaded) {
      loaded('done')
    }
  },
  data() {
    return {
      isShow: false,
      list: [
        {
          code: 1,
          title: '洗颜新潮流！人气洁面皂排行榜',
//          img: 'https://static.vux.li/demo/1.jpg'
          img: 'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'
        },
        {
          code: 2,
          title: '美容用品 & 日用品（上）',
//          img: 'https://static.vux.li/demo/2.jpg'
          img: 'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'
        },
        {
          code: 3,
          title: '远离车内毒气，日本车载空气净化器精选',
//          img: 'https://static.vux.li/demo/3.jpg'
          img: 'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'
        }
      ]
    }
  },
  mounted() {
    this.$one.test(this.$route.path)
  }
}
</script>
<style scoped>
.m-img {
  padding-bottom: 33%;
  display: block;
  position: relative;
  max-width: 100%;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  border-radius: 2px;
}

.m-title {
  color: #fff;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  font-weight: 500;
  font-size: 16px;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
}

.m-time {
  font-size: 12px;
  padding-top: 4px;
  border-top: 1px solid #f0f0f0;
  display: inline-block;
  margin-top: 5px;
}
.vux-header {
  position: relative;
  z-index: 999;
}
</style>


