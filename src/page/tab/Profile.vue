<template>
  <div style="height:100%">
    <x-header title="" :left-options="{showBack: false}">
      <span slot="left">我的</span>
    </x-header>
    <div class="header" @click="myMsg">
      <span class="img-box">
        <!--<img src="../../assets/19424162.jpg" alt="">-->
        <img :src=portraitUri alt="">
      </span>
      <span class="user">
        <p v-if="role === 'puser'">{{ name }}</p>
        <p v-if="role === 'cuser'">{{ name }}</p>
        <p><i class="iconfont icon-shouji" style="color:#fff;"></i>{{ hiddenNumber }}</p>
      </span>
      <span class="arrow">
        <i class="iconfont icon-jiantou"></i>
      </span>
    </div>
    <!-- <group-title>个人信息</group-title>
    <group>
      <cell title="注册信息">
        <i slot="icon" class="iconfont icon-jifen"></i>
      </cell>
    </group> -->
    <!-- <group-title>账户安全</group-title> -->
    <group class="profile-lists">
      <!--<cell title="我的资质">-->
      <!--&gt;-->
      <!--<i slot="icon" class="iconfont icon-zizhi" style="color:#E03636;"></i>-->
      <!--</cell>-->
      <!--<cell title="服务评价" link="/evaluation">-->
      <!--<i slot="icon" class="iconfont icon-iconfontevaluate" style="color:#EDD0BE;"></i>-->
      <!--</cell>-->
      <!--<cell title="我感兴趣的" link="/interest">-->
      <!--<i slot="icon" class="iconfont icon-shoucang" style="color:#FF534D;"></i>-->
      <!--</cell>-->
      <!--<cell title="建议反馈" link="/suggestion">-->

      <!--<i slot="icon" class="iconfont icon-fankuilast" style="color:#EDD0BE;"></i>-->
      <!--</cell>-->
      <!--<cell title="使用帮助" link="/help">-->

      <!--<i slot="icon" class="iconfont icon-bangzhu" style="color:#25C6FC;"></i>-->
      <!--</cell>-->
      <cell title="退出登录" @click.native="quit">

        <i slot="icon" class="iconfont icon-close" style="color:#FF534D;"></i>
      </cell>
    </group>
  </div>
</template>
<script>
  import { XHeader, Group, Cell, GroupTitle } from 'vux'
  export default {
    components: {
      XHeader,
      Group,
      Cell,
      GroupTitle
    },
    methods: {
      myMsg() {
        this.$router.push('/myMsg')
      },
      quit() {
        localStorage.removeItem('userId')
        localStorage.removeItem('userMsg')
        localStorage.removeItem('role')
        this.$router.push('/')
      }
    },
    data() {
      return {
        username: JSON.parse(localStorage.getItem('userMsg')).nickName,
        phoneNumber: localStorage.getItem('userId'),
        role: localStorage.getItem('role'),
        name: JSON.parse(localStorage.getItem('userMsg')).name,
        portraitUri: JSON.parse(localStorage.getItem('userMsg')).portraitUri
      }
    },
    computed: {
      hiddenNumber() {
        return this.phoneNumber.substr(0, 3) + '****' + this.phoneNumber.substr(7)
      }
    },
    mounted() {
      this.$one.path = this.$route.path
      console.log('路径测试')
      console.log(this.$one.path)
    }
  }
</script>
<style scoped>
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .header {
    display: flex;
    height: 18%;
    background: linear-gradient(
      to bottom left,
      #409eff,
      rgba(94, 172, 255, 0.871)
    );
    align-items: center;
    padding: 0 1em;
    position: relative;
  }

  .img-box {
    display: inline-block;
    width: 5em;
    height: 5em;
  }

  .user {
    height: 5em;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 1em;
    color: #fff;
  }

  .arrow {
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    right: 1em;
  }

  .arrow i {
    color: #fff;
    font-size: 2em;
  }

  .profile-lists i {
    margin-right: 10px;
  }
</style>

