<template>
    <div class="main">
      <x-header>建议反馈</x-header>
      <group gutter="0">
        <x-textarea  placeholder="请将您的建议和意见告诉我们" :max="300" :height="240" v-model="suggestion"></x-textarea>
        <x-input  placeholder="请留下您的手机号码，QQ，微信等联系方式" v-model="contact"></x-input>
      </group>

      <x-button id="submit" text="提交" type="primary" class="btn" :disabled="isDisabled" ></x-button>

    </div>
</template>

<script>
  import { Group, XHeader, XTextarea, XInput, XButton } from 'vux'
export default{
    components: {
      XHeader,
      Group,
      XTextarea,
      XInput,
      XButton
    },
    data() {
      return {
        suggestion: '',
        contact: '',
        isDisabled: true
      }
    },
    updated: function () {
      if (this.suggestion === '' || this.contact === '') {
        this.isDisabled = true
      } else {
        this.isDisabled = false
      }
    }
}
</script>

<style scoped>
  .main{
    background-color: #f0f0f0;
    height: 100%;
    padding-top:0;
  }
  .btn{
    width: 80%;
    margin-top:15%;
  }
</style>
