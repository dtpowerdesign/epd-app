<template>
  <div class="main">
    <x-header>查看投标信息</x-header>
    <div class="content">
      <divider>个体投标</divider>
      <div class="perbid" v-for="(i,j) in perBid" :key="j" v-if="i.srcUserType==='puser'&&i.bidType==='personal'">
        <p><span>投标人账号：</span><span>{{i.srcUserAccount}}</span></p>
        <p><span>投标人姓名：</span><span>{{i.srcUserName}}</span></p>
        <p><span>投标描述：</span><span>{{i.bidInstruction}}</span></p>
        <p v-for="file in i.upDatas" style="position: relative;margin-top: 10px;">
          <span>投标附件：</span><span>{{file.dataName}}</span>
          <span><x-button type="primary" style="display: inline-block;position: absolute;right: 30px;" mini
                          @click.native="download(file.urlPath)">下载附件</x-button></span>
        </p>
      </div>

      <divider>企业投标</divider>
      <div class="perbid" v-for="(i,j) in perBid" :key="j" v-if="i.srcUserType==='cuser'&&i.bidType==='personal'">
        <p><span>投标企业账号：</span><span>{{i.srcUserAccount}}</span></p>
        <p><span>投标企业名称：</span><span>{{i.srcUserName}}</span></p>
        <p><span>投标描述：</span><span>{{i.bidInstruction}}</span></p>
        <p v-for="file in i.upDatas" style="position: relative;margin-top: 10px;">
          <span>投标附件：</span><span>{{file.dataName}}</span>
          <span><x-button type="primary" style="display: inline-block;position: absolute;right: 30px;" mini
                          @click.native="download(file.urlPath)">下载附件</x-button></span>
        </p>
      </div>

      <divider>联合体投标</divider>
      <div class="perbid" v-for="(i,j) in perBid" :key="j" v-if="i.bidType==='unit'">
        <p><span>投标投标账号：</span><span>{{i.srcUserAccount}}</span></p>
        <p><span>投标投标姓名：</span><span>{{i.srcUserName}}</span></p>
        <p><span>投标人类型：</span><span>{{formatType(i.srcUserType)}}</span></p>
        <p><span>投标描述：</span><span>{{i.bidInstruction}}</span></p>
        <p v-for="file in i.upDatas" style="position: relative;margin-top: 10px;">
          <span>投标附件：</span><span>{{file.dataName}}</span>
          <span><x-button type="primary" style="display: inline-block;position: absolute;right: 30px;" mini
                          @click.native="download(file.urlPath)">下载附件</x-button></span>
        </p>
        <hr>
        <p style="text-align: center;color: #6b76cc">联合体成员</p>
        <div class="merber" v-for="merber in i.invitatedBidAccounts">
          <p><span>成员账号：</span><span>{{merber.userId}}</span></p>
          <p><span>成员姓名：</span><span>{{merber.userName}}</span></p>
          <p><span>担当角色：</span><span>{{merber.job}}</span></p>
          <p><span>成员类型：</span><span>{{formatType(merber.userType)}}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { XHeader, XTable, Loading, XButton, Flexbox, FlexboxItem, Divider } from 'vux'
  export default{
    components: {
      XHeader, XTable, Loading, XButton, Flexbox, FlexboxItem, Divider
    },
    data() {
      return {
        perBid: []
      }
    },
    methods: {
      formatType(type) {
        if (type === 'puser') {
          return '个人用户'
        } else if (type === 'cuser') {
          return '企业用户'
        }
      },
      initData() {
        this.$http.post(this.$domain + '/electric-design/getMultRecordByKeysAndValues', {
          'table': 'bidrecord',
          'keys': ['belongToProjectCode'],
          'values': [this.$route.query.code]
        })
          .then(res => {
            this.perBid = res.data
            console.log(this.perBid)
          })
      },
      download (path) {
        window.open(this.$domain + '/electric-design/dowloads?fileUrl=' + path)
      }
    },
    mounted() {
      this.initData()
    }
  }
</script>

<style scoped>
  .main {
    background-color: #f0f8ff;
    height: 100%;
  }

  .content {
    max-height: 80%;
    overflow: auto;
    font-size: 15px;
  }

  .perbid {
    margin: 10px;
    padding: 5px;
    background-color: #edede9;
    border: 2px solid #ccc;
    box-shadow: 5px 5px 10px #888888;
    border-radius: 10px;
  }

  .merber {
    margin: 10px;
    padding: 5px;
    background-color: #edede9;
    border: 2px solid #ccc;
    box-shadow: 5px 5px 10px #888888;
    border-radius: 10px;
  }
</style>
