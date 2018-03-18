<template>
<div>
  <x-header @on-click-back="goback"></x-header>
</div>
</template>
<script>
import { XHeader } from 'vux'
export default {
  components: {
    XHeader
  },
  data() {
    return {}
  },
  methods: {
    goback() {
      this.$router.goBack()
    }
  }
}
</script>
<style scoped>

</style>


