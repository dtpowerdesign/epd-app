<template>
    <div>
      <x-header>感兴趣的任务</x-header>
      <card :header="{title:'我感兴趣的'}">
        <div slot="content">
          <checker v-model="selected" type="checkbox" default-item-class="before-select" selected-item-class="after-selected">
            <checker-item v-for="select in selected" :value="select" class="close-father">{{select}}
            <icon type="clear" class="close"></icon>
            </checker-item>
          </checker>
        </div>
      </card>
      <card :header="{title:'选择'}">
        <div slot="content">
          <checker v-model="selected" type="checkbox" default-item-class="before-select" selected-item-class="after-selected">
            <checker-item v-for="item in items" :value="item">{{item}}</checker-item>
          </checker>
        </div>
      </card>
    </div>
</template>

<script>
  import { XHeader, Card, Checker, CheckerItem, Icon } from 'vux'
  export default {
    components: {
      XHeader,
      Card,
      Checker,
      CheckerItem,
      Icon
    },
    data () {
      return {
        selected: [],
        items: [
          '成套报价',
          '成套报价1',
          '成套报价2',
          '成套报价3',
          '成套报价4',
          '成套报价5',
          '成套报价6'
        ]
      }
    }
  }
</script>

<style>
  .close{
    position: absolute;
    right: -6px;
    top:-3px;
  }
  .close-father{
    position: relative;
  }
.before-select{
  width: 30%;
  margin-left: 2%;
  background-color: #f3f2f9;
  padding: 5px 10px;
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 2%;
  border: 1px solid #d1d1d1;
}
  .after-selected{
    border: 1px solid #00a9b8;

  }
</style>
