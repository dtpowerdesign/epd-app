<template>
    <div>
      <x-header>服务评价</x-header>
      <group title="发单者对我的评价">
        <p>
          <rater v-model="data1" disabled class="rater"></rater>非常满意
          <span class="count">{{sendPerson.data1}}次</span>
        </p>
        <p>
          <rater v-model="data2" disabled class="rater"></rater>很满意
          <span class="count">{{sendPerson.data2}}次</span>
        </p>
        <p>
          <rater v-model="data3" disabled class="rater"></rater>满意
          <span class="count">{{sendPerson.data3}}次</span>
        </p>
        <p>
          <rater v-model="data4" disabled class="rater"></rater>不满意
          <span class="count">{{sendPerson.data4}}次</span>
        </p>
        <p>
          <rater v-model="data5" disabled class="rater"></rater>非常不满意
          <span class="count">{{sendPerson.data5}}次</span>
        </p>
      </group>
      <group title="接单者对我的评价">
        <p>
          <rater v-model="data1" disabled class="rater"></rater>非常满意
          <span class="count">{{receivePerson.data1}}次</span>
        </p>
        <p>
          <rater v-model="data2" disabled class="rater"></rater>很满意
          <span class="count">{{receivePerson.data2}}次</span>
        </p>
        <p>
          <rater v-model="data3" disabled class="rater"></rater>满意
          <span class="count">{{receivePerson.data3}}次</span>
        </p>
        <p>
          <rater v-model="data4" disabled class="rater"></rater>不满意
          <span class="count">{{receivePerson.data4}}次</span>
        </p>
        <p>
          <rater v-model="data5" disabled class="rater"></rater>非常不满意
          <span class="count">{{receivePerson.data5}}次</span>
        </p>
      </group>
    </div>
</template>

<script>
  import { XHeader, Group, Cell, Rater } from 'vux'
  export default {
    components: {
      XHeader,
      Group,
      Cell,
      Rater
    },
    data() {
      return {
        data1: 5,
        data2: 4,
        data3: 3,
        data4: 2,
        data5: 1,
        sendPerson: {
          data1: 0,
          data2: 0,
          data3: 0,
          data4: 0,
          data5: 0
        },
        receivePerson: {
          data1: 0,
          data2: 0,
          data3: 0,
          data4: 0,
          data5: 0
        }
      }
    },
    mounted() {
      this.$one.test(this.$route.path)
    }
  }
</script>

<style>
.count{
  position: absolute;
  right: 10px;
}
  .rater{
    margin-right: 10px;
  }
</style>
