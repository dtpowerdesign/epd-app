<template>
  <div>
    <x-header class="header" title="发布任务" :left-options="{showBack: false}"></x-header>
    <group title="任务名称">
      <x-input title="任务名称"></x-input>
    </group>
    <group title="任务地点">
      <x-address title="地点" :list="addressData"></x-address>
    </group>
    <group title="详细描述">
      <x-textarea :max="200" placeholder="详细描述" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
    </group>
    <flexbox>
      <flexbox-item>
        <x-button type="primary">发布</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button type="warn">重置</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
import {
  XHeader,
  Group,
  XInput,
  XTextarea,
  XAddress,
  ChinaAddressV4Data,
  XButton,
  Flexbox,
  FlexboxItem
} from 'vux'
export default {
  components: {
    XHeader,
    Group,
    XInput,
    XTextarea,
    XAddress,
    XButton,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      addressData: ChinaAddressV4Data
    }
  },
  methods: {
    onEvent(event) {
      console.log(event)
    }
  }
}
</script>
<style scoped>
.vux-flexbox {
  margin-top: 20px !important;
}
</style>

