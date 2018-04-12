<template>
  <div class="main">
    <x-header title="联合体"></x-header>
    <divider>我收到的</divider>
    <x-table>
      <tr>
        <td>项目名称</td>
        <td>点击查看</td>
      </tr>
    </x-table>
    <divider v-show="receiveShow">暂无数据</divider>
    <div class="receive">
      <x-table>
        <tr v-for="(item,index) in tableData" :key="index">
          <td>{{item.name}}</td>
          <td class="btn">
            <x-button type="primary" text="查看详情" mini @click.native="go(item.code,'true',item.ucode)"></x-button>
          </td>
        </tr>
      </x-table>
    </div>

    <divider>我发起的</divider>
    <x-table>
      <tr>
        <td>项目名称</td>
        <td>点击查看</td>
      </tr>
    </x-table>
    <divider v-show="launchShow">暂无数据</divider>
    <div class="launch">
      <x-table>
        <tr v-for="(item,index) in launchData">
          <td>{{item.name}}</td>
          <td class="btn">
            <x-button type="primary" text="查看详情" mini @click.native="go(item.code,'false',item.ucode)"></x-button>
          </td>
        </tr>
      </x-table>
    </div>

  </div>
</template>

<script>
  import { XHeader, XTable, XButton, Divider } from 'vux'
  export default{
    components: {
      XHeader,
      XTable,
      XButton,
      Divider
    },
    data() {
      return {
        tableData: [],
        receiveShow: true,
        launchData: [],
        launchShow: true
      }
    },
    methods: {
      go(code, show, ucode) {
        this.$router.push({
          path: 'detail',
          query: {
            code: code,
            show: show,
            ucode: ucode
          }
        })
      },
      initData() {
        //收到的请求
        this.$http.post(this.$domain + '/electric-design/getunionInviteProjects',
          {'userId': localStorage.getItem('userId')}
        ).then(res => {
          if (res.data.length !== 0) {
            this.receiveShow = false
            this.tableData = res.data
          }
        })
        //发起的联合体请求
        this.$http.post(this.$domain + '/electric-design/getAllUnioProjectsByAccount',
          {'userId': localStorage.getItem('userId')}
        ).then(res => {
          if (res.data.length !== 0) {
            this.launchShow = false
            this.launchData = res.data
          }
        })
      }
    },
    mounted() {
      this.initData()
    }
  }
</script>

<style scoped>
  .main {
    height: 100%;
  }

  .receive {
    max-height: 30%;
    overflow: auto;
  }

  .launch {
    max-height: 30%;
    overflow: auto;
  }

  .btn {
    width: 50%;
  }
</style>
