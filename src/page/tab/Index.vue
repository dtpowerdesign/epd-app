<template>
  <div class="index">
    <header></header>
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"
            @click.native="goNews"></swiper>
    <div class="categories">
      <div class="categories-items" @click="goProject('发电厂')">
        <div class="categories-icon" style="background-color:#E03636;">
          <i class="iconfont icon-yancong"></i>
        </div>
        发电厂
      </div>
      <div class="categories-items" @click="goProject('输电')">
        <div class="categories-icon" style="background-color:#EDD0BE;">
          <i class="iconfont icon-shuffle"></i>
        </div>
        输电
      </div>
      <div class="categories-items" @click="goProject('变电')">
        <div class="categories-icon" style="background-color:#FF534D;">
          <i class="iconfont icon-biandianchang"></i>
        </div>
        变电
      </div>
      <div class="categories-items" @click="goProject('供配电')">
        <div class="categories-icon" style="background-color:#EDD0BE;">
          <i class="iconfont icon-diangongdianqi"></i>
        </div>
        供配电
      </div>
      <div class="categories-items" @click="goProject('建筑')">
        <div class="categories-icon" style="background-color:#25C6FC;">
          <i class="iconfont icon-jianzhu"></i>
        </div>
        建筑
      </div>
    </div>
    <div class="news">
      <section class="news-in">
        <div class="news-icon">
          <i class="iconfont icon-news1"></i>
        </div>
        <marquee direction="up">
          <marquee-item v-for="i in 5" :key="i" @click.native="goNews" class="align-middle">
            <p>• hello world {{i}}</p>
            <p>• hello world {{i + 1}}</p>
          </marquee-item>
        </marquee>
      </section>
    </div>
    <div class="project">
      <group-title class="project-header"><i class="iconfont icon-jianzhu"></i> 任务展示</group-title>
      <ul class="content-title">
        <li>
          <section>
            <span><i class="iconfont icon-aui-icon-location"></i>项目地点</span>
            <span>项目名称</span>
            <span>| 投资金额</span>
          </section>
        </li>
      </ul>
      <hr/>

      <!--<marquee direction="up" :interval=1000>-->
      <!--<marquee-item v-for="i in 5" :key="i" @click.native="goProject" class="align-middle">-->
      <div class="content">
        <ul>
          <li v-for="(project, index) in projects" :key="index" @click="go(project.code)">
            <section>
              <span><i class="iconfont icon-aui-icon-location"></i>{{ project.address }}</span>
              <span>{{ project.name }}</span>
              <span>| {{ project.amountOfInvestment }}</span>
            </section>
          </li>
        </ul>
      </div>
      <!--</marquee-item>-->
      <!--</marquee>-->
    </div>
  </div>
</template>
<script>
  import { Swiper, Marquee, MarqueeItem, GroupTitle } from 'vux'

  //  const projectList = [
  //    {
  //      location: '河北',
  //      title: '监测变压器',
  //      extra: '1500',
  //      price: 200
  //    },
  //    {
  //      location: '河北',
  //      title: '监测变压器',
  //      extra: '1500',
  //      price: 200
  //    },
  //    {
  //      location: '河北',
  //      title: '监测变压器',
  //      extra: '1500',
  //      price: 200
  //    },
  //    {
  //      location: '河北',
  //      title: '监测变压器',
  //      extra: '1500',
  //      price: 200
  //    },
  //    {
  //      location: '河北',
  //      title: '监测变压器',
  //      extra: '1500',
  //      price: 200
  //    },
  //    {
  //      location: '河北',
  //      title: '监测变压器',
  //      extra: '1500',
  //      price: 200
  //    },
  //    {
  //      location: '河北',
  //      title: '监测变压器',
  //      extra: '1500',
  //      price: 200
  //    }
  //  ]

  const baseList = [
    {
      url: 'javascript:',
      img: './static/img/1.jpg',
      title: '送你一朵'
    },
    {
      url: 'javascript:',
      img: './static/img/2.jpg',
      title: '送你一辆'
    },
    {
      url: 'javascript:',
      // img: 'https://static.vux.li/demo/5.jpg',
      title: '送你一次旅行',
      fallbackImg: './static/img/3.jpg'
    }
  ]

  export default {
    components: {
      Swiper,
      Marquee,
      MarqueeItem,
      GroupTitle
    },
    data() {
      return {
        demo01_list: baseList,
        demo01_index: 0,
        projects: []
      }
    },
    methods: {
      demo01_onIndexChange(index) {
        console.log('demo item change', index)
      },
      goProject(type) {
        this.$router.push({
          path: '/index/proarc',
          query: {
            type: type
          }
        })
      },
      goNews() {
        this.$router.push('/index/news')
      },
      go(code) {
        this.$router.push({
          path: 'project/detail',
          query: {
            code: code
          }
        })
      },
      initData() {
        this.projects = []
        this.$http.post(this.$domain + '/electric-design/getProjectsByMultiConditions ',
          {'conditions': {'state': {'searchMethod': 'values', 'values': ['投标中']}}}
        ).then(res => {
//          console.log('all:' + res.data)
          this.projects = res.data
          console.log(this.projects)
        })
      }
    },
    mounted() {
      this.initData()
    }
  }
</script>
<style scoped>
  .content {
    height: 100%;
    overflow: auto;
  }

  .content span {
    width: 30%;
  }

  .content-title span {
    width: 30%;
  }

  .index {
    height: 100%;
    background-color: aliceblue;
    overflow: scroll;
  }

  header {
    height: 46px;
    width: 100%;
    background-color: #409eff;
    position: fixed;
    top: 0px;
    z-index: 999;
  }

  .vux-slider {
    margin-top: 46px;
  }

  .categories {
    width: 100%;
    height: 100px;
    background-color: #fff;
    display: flex;
    align-items: center;
  }

  .categories-items {
    width: 80px;
    height: 70%;
    text-align: center;
  }

  .categories-icon {
    width: 70%;
    height: 70%;
    margin: 0 auto;
    opacity: 0.7;
    border-radius: 40%;
    box-shadow: 1px 1px 9px 0 #409eff;
  }

  .categories-icon > i {
    font-size: 2em;
    color: beige;
  }

  .news {
    height: 70px;
    width: 100%;
    background-color: #fff;
    margin-top: 7px;
    display: flex;
    align-items: center;
  }

  .news-in {
    height: 75%;
    width: 100%;
    display: flex;
  }

  .news-in > div.news-icon {
    height: 100%;
    width: 17%;
    border-right: 1px solid gray;
    text-align: center;
  }

  .news-in i {
    font-size: 3em;
    position: relative;
    bottom: 6px;
  }

  .vux-marquee {
    width: 83% !important;
    height: 90% !important;
    padding-left: 20px !important;
  }

  .vux-marquee-box li {
    list-style-type: none;
    height: 100%;
  }

  .project {
    height: 50%;
    background-color: #fff;
    margin-top: 7px;
  }

  .project-header {
    padding: 3px 0 0px 10px;
    color: #409eff;
  }

  .project section {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .project section:active {
    color: #409eff;
  }

  /* .news-in>ul {
    width: 83%;
    list-style: none;
    counter-reset: count;
  }
  .news-in>ul>li {
    width: 80%;
    margin: 0 auto;
  }
  .news-in>ul>li::before {
    counter-increment: count;
    content: "• ";
    color: #409EFF;
  } */
</style>

