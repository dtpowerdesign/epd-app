<template>
  <div class="main">
    <x-header :title="this.$route.query.title"></x-header>

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
            <x-button type="primary" text="查看详情" mini @click.native="go(item.code,item.state)"></x-button>
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
        state: this.$route.query.title,
        releaseUserAccount: localStorage.getItem('userId')
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
//            this.tableData = res.data
            if (this.$route.query.title === '投标中') {
              for (let i in res.data) {
                if (res.data[i].releaseUserAccount !== localStorage.getItem('userId') && res.data[i].state === this.state) {
                  this.tableData.push(res.data[i])
                }
              }
            } else if (this.$route.query.title === '招标中') {
              for (let i in res.data) {
                if (res.data[i].releaseUserAccount === localStorage.getItem('userId') && res.data[i].state === '投标中') {
                  this.tableData.push(res.data[i])
                }
              }
            } else {
              for (let i in res.data) {
                if (res.data[i].state === this.state) {
                  this.tableData.push(res.data[i])
                }
              }
            }
//            this.releaseUserAccount = res.data[1].releaseUserAccount
            console.log(this.tableData)
//            console.log('user:' + this.releaseUserAccount)
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
      this.$one.test(this.$route.path)
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
