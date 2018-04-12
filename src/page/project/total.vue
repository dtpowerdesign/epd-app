<template>
  <div class="main">
    <x-header title="汇总"></x-header>
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
            <x-button type="primary" text="查看详情" mini @click.native="go(item.code)"></x-button>
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
        tableData: []
      }
    },
    methods: {
      initData() {
//        console.log(this.$route.query.title)
        this.$http.post(this.$domain + '/electric-design/getProjectAboutUser',
          {'conditions': {'aboutUsers': {'searchMethod': 'values', 'values': [localStorage.getItem('userId')]}}}
        )
          .then(res => {
            this.$vux.loading.hide()
            this.tableData = res.data
//            console.log(this.tableData[0])
          })
      },
      go(code) {
        this.$router.push({
          path: 'detail',
          query: {
            code: code
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
