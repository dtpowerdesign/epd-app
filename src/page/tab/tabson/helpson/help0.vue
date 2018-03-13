<template>
    <div class="main">
      <div class="top">
        <x-header>使用帮助</x-header>
        <p class="title">接单流程</p>
      </div>
      <div class="img" >
        <x-img src="/src/assets/help.jpg"  ></x-img>
      </div>
    </div>
</template>

<script>
  import { XImg, XHeader } from 'vux'
  export default{
    components: {
      XImg,
      XHeader
    }
  }
</script>

<style scoped>
.title{
  padding: 10px;
}
  .img{
    height:87%;
    overflow: auto;
    margin-left: 10px;
    margin-right: 10px;
  }
  .top{
    height: 13%;
  }
  .main{
    height: 100%;
  }
</style>
