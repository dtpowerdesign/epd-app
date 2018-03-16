<template>
  <div>
    <x-header title="聊天" :left-options="{showBack: false}" :right-options="{showMore: true}" @on-click-more="showMenus = true"></x-header>

    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    </div>
  </div>
</template>
<script>
import { XHeader, TransferDom, Actionsheet } from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet
  },
  data() {
    return {
      menus: {
        menu1: '添加好友'
      },
      showMenus: false
    }
  }
}
</script>
<style scoped>

</style>

