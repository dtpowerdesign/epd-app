<template>
  <div class="main">
    <x-header>详细信息</x-header>
    <div class="receive" v-show="isShow">
      <p>联合体发起人账号:<span>{{invitation.unionUserId}}</span></p>
      <p>联合体发起人名字:<span>{{invitation.unionUserName}}</span></p>
      <p>我承担的角色:<span>{{invitation.job}}</span></p>
    </div>
    <div class="table">
      <x-table>
        <tr v-for="(item,index) in json">
          <td class="left">{{index}}</td>
          <td>{{item}}</td>
        </tr>
      </x-table>
    </div>
    <flexbox>
      <flexbox-item>
        <x-button @click.native="go" type="primary">选择显示的内容</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button @click.native="bidInfo" type="primary">查看投标信息</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
  import { XHeader, XTable, Loading, XButton, Flexbox, FlexboxItem } from 'vux'
  export default {
    components: {
      XHeader,
      XTable,
      Loading,
      XButton,
      Flexbox,
      FlexboxItem
    },
    data() {
      return {
        tableKey: {},
        json: {},
        tableData: {},
        receiveShow: this.$route.query.show,
        invitation: {},
        ucode: this.$route.query.ucode
      }
    },
    computed: {
      isShow() {
        if (this.receiveShow === 'true') {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      go() {
        this.$router.push('./changeTableHead')
//
//        if (this.$route.query.show === true) {
//          this.$router.push('./changeTableHead')
//        }
      },
      bidInfo() {
        this.$router.push({
          path: './bidInfo',
          query: {
            code: this.json.项目编号
          }
        })
      },
      initData() {
        //是否请求联合体发起人的信息
        console.log(this.receiveShow)
        if (this.receiveShow === 'true') {
//          console.log('1')
//          console.log('ucode')
          this.$http.post(this.$domain + '/electric-design/getMultRecordByKeysAndValues',
            {
              'table': 'unionapply',
              'keys': ['code'],
              'values': [this.ucode]
            }
          ).then(res => {
            this.invitation = res.data[0]
          })
        }
        //------------------------------------------------
        this.$http.post(this.$domain + '/electric-design/getShowKeyAndExplain',
          {'belongToUser': localStorage.getItem('userId'), 'table': 'projects', 'otherName': 'project'}
        )
          .then(res => {
            this.$vux.loading.hide()
            this.tableKey = res.data
//---------------------------------------------------------------------------------
            this.$http.post(this.$domain + '/electric-design/getProjectByCode',
              {'code': this.$route.query.code}
            ).then(res => {
              if (res.data['releaseUserAccount'] === localStorage.getItem('userId') && res.data['state'] === '投标中') {
                res.data['state'] = '招标中'
              }
              for (let i in this.tableKey) {
//              console.log(i)
//          console.log(i.toString())
                let temp = res.data
                if (Array.isArray(temp[i]) && (i !== 'processRequirements')) {
                  this.tableData[i] = temp[i].concat().join(',')
                } else if (i.match(/(Time)$/) && !i.match(/^(all)/) && res.data[i] !== '暂无数据') {
                  temp[i].year = temp[i].year || 0
                  temp[i].month = temp[i].month || 0
                  temp[i].date = temp[i].date || 0
                  this.tableData[i] = [].concat((temp[i].year + 1900), (temp[i].month + 1), temp[i].date).join('/')
                } else {
                  this.tableData[i] = temp[i]
                }
//              console.log(this.tableData)
                for (i in this.tableKey) {
                  this.$set(this.json, this.tableKey[i], this.tableData[i])
                }
              }
              console.log(this.json)

              //------------------------------
//        this.tableData = res.data
////        console.log(res.data['name'])
////        console.log(res.data)
//        this.tableData['type'] = this.tableData['type'].toString()
//        this.tableData['category'] = this.tableData['category'].toString()
//        this.tableData['major'] = this.tableData['major'].toString()
//        this.tableData['endTime'] = `${this.tableData['endTime'].year + 1900}-${this.tableData['endTime'].month + 1}-${this.tableData['endTime'].date}`
//        console.log(this.tableData)
            })
//          for (let i in this.tableKey) {
//            console.log(i)
//          }
          })
        //-------------------------------------------
      }
    },
    mounted() {
      this.initData()
      this.$vux.loading.show({
        text: 'Loading'
      })
    }
  }
</script>

<style scoped>
  .main {
    height: 100%;
  }

  .table {
    max-height: 60%;
    overflow: auto;
  }

  .left {
    /*display: inline-block !important;*/
    /*min-width: 30px !important;*/
    min-width: 150px
  }

  .receive {
    background-color: #e8e8e8;
    color: #65b9bb;
    font-size: 18px;
    padding-left: 10px;
  }

  .receive span {
    margin-left: 15px;
  }
</style>
