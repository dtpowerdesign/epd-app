<template>
  <div style="height:100%">
    <x-header title="" :left-options="{showBack: false}">
      <span slot="left">我的</span>
    </x-header>
    <div class="header">
      <span class="img-box">
        <img src="../../assets/19424162.jpg" alt="">
      </span>
    </div>
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
  }
}
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.header {
  display: flex;
  height: 18%;
  background: linear-gradient(
    to bottom left,
    #409eff,
    rgba(94, 172, 255, 0.871)
  );
  align-items: center;
  padding: 0 1em;
}
.img-box {
  display: inline-block;
  width: 5em;
  height: 5em;
}
</style>

