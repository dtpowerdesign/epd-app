<template>
<div>
  <x-header class="header" title="统计" :left-options="{preventGoBack: true}"  @on-click-back="goback" ></x-header>
</div>
</template>
<script>
import { XHeader } from 'vux'
export default {
  components: {
    XHeader
  },
  methods: {
    goback() {
      this.$router.goBack()
    }
  },
  mounted() {
    this.$one.test(this.$route.path)
  }
}
</script>
<style scoped>

</style>


