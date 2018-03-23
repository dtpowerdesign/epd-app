<template>
  <div>
    <x-header class="header" title="详情" :left-options="{preventGoBack: true}"  @on-click-back="goback" ></x-header>
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>

    <load-more tip="暂无数据" background-color="#fbf9fe" :show-loading="false" v-show="isShow"></load-more>
  </div>
</template>
<script>
import { XHeader, LoadMore } from 'vux'
export default {
  components: {
    XHeader,
    LoadMore
  },
  data() {
    return {
      isShow: true,
      loading: false,
      post: null,
      error: null
    }
  },
  created() {
    //组件创建完成后获取数据,
    //此时data已经被observed
    this.fetchData()
  },
  watch: {
    //如果路由有变化，会再次执行该方法
    $route: 'fetchData'
  },
  methods: {
    fetchData() {
      this.error = this.post = null
      this.loading = true
      //replace getPost with your data fetching util / API wrapper
      // getPost(this.$route.params.id, (err, post) => {
      //   this.loading = false
      //   if (err) {
      //     this.error = err.toString()
      //   } else {
      //     this.post = post
      //   }
      // })
      console.log(this.$route.params.id)
    },
    goback() {
      this.$router.goBack()
    }
  }
}
</script>
<style scoped>

</style>


