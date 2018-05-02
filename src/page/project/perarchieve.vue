<template>
  <div class="main">
    <x-header v-if="role === 'puser'">个人业绩</x-header>
    <x-header v-if="role === 'cuser'">企业业绩</x-header>
    <x-table>
      <thead>
      <tr>
        <td>项目名称</td>
        <td>点击查看</td>
      </tr>
      </thead>
    </x-table>

    <div class="content">
      <x-table>
        <tbody>
        <tr v-for="(item,index) in tableData">
          <td>{{item.name}}</td>
          <td class="btn">
            <x-button type="primary" text="查看详情" mini @click.native="go(item.code, item.state)"></x-button>
          </td>
        </tr>
        </tbody>
      </x-table>
    </div>

  </div>
</template>

<script>
  import { XHeader, XTable, XButton, Loading } from 'vux'
  export default{
    components: {
      XHeader,
      XTable,
      XButton,
      Loading
    },
    data() {
      return {
        tableData: [],
        role: localStorage.getItem('role')
      }
    },
    methods: {
      initData() {
        this.$http.post(this.$domain + '/electric-design/getProjectAboutUser',
          {'conditions': {'aboutUsers': {'searchMethod': 'values', 'values': [localStorage.getItem('userId')]}}}
        )
          .then(res => {
            this.$vux.loading.hide()
            this.tableData = res.data
            console.log(this.tableData[0])
          })
      },
      go(code, show) {
        this.$router.push({
          path: 'detail',
          query: {
            code: code,
            show: show
          }
        })
      }
    },
    mounted() {
      this.$vux.loading.show({
        text: 'Loading'
      })
      this.initData()
    }
  }
</script>

<style>
  .main {
    height: 100%;
  }

  .content {
    height: 70%;
    overflow: auto;
  }

  .btn {
    width: 50%;
  }
</style>
