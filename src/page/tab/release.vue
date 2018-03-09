<template>
  <div>
    <group title="项目基本信息">
       <x-input title="招标公司" placeholder="请输入招标公司"></x-input>
       <x-input title="项目名称" placeholder="请输入项目名称"></x-input>
       <x-input title="项目地点" placeholder="请输入项目地点"></x-input>
       <selector title="类别"  placeholder="请选择类别" v-model="demo1" :options="list1"></selector>
       <selector title="类型"  placeholder="请选择类型" v-model="demo2" :options="list2"></selector>
       <selector title="设计阶段"  placeholder="请选择设计阶段" v-model="demo3" :options="list3"></selector>
       <selector title="涉及专业"  placeholder="请选择涉及专业" v-model="demo4" :options="list4"></selector>
       <!-- <selector title="类别"  placeholder="请选择类别" v-model="demo5" :options="list5"></selector> -->
       <datetime title="开始时间" placeholder="请选择开始时间" format="YYYY-MM-DD " ></datetime>
       <datetime title="结束时间" placeholder="请选择结束时间" format="YYYY-MM-DD " ></datetime>
    </group>
  </div>
</template>
<script>
import { Datetime, Selector, XInput, Group, XButton, Cell } from 'vux'
export default {
  components: {
    Datetime,
    Selector,
    XInput,
    XButton,
    Group,
    Cell},
  data() {
    return {
      demo1: '',
      demo2: '',
      demo3: '',
      demo4: '',
      list1: ['1', '2', '3'],
      list2: ['1', '2', '3'],
      list3: ['1', '2', '3'],
      list4: ['1', '2', '3']

    }
  }
}
</script>
<style scoped>

</style>

