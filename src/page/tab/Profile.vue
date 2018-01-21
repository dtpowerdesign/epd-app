<template>
  <div style="height:100%">
    <x-header title="" :left-options="{showBack: false}">
      <span slot="left">我的</span>
    </x-header>
    <div class="header">
      <span class="img-box">
        <img src="../../assets/19424162.jpg" alt="">
      </span>
      <span class="user">
        <p>{{ username }}</p>
        <p><i class="iconfont icon-shouji" style="color:#fff;"></i>{{ hiddenNumber }}</p>
      </span>
      <span class="arrow">
        <i class="iconfont icon-jiantou"></i>
      </span>
    </div>
    <group-title>个人信息</group-title>
    <group>
      <cell title="注册信息">
        <i slot="icon" class="iconfont icon-jifen"></i>
      </cell>
    </group>
    <group-title>账户安全</group-title>
    <group>
      <cell title="Test">
        <i slot="icon" class="iconfont icon-jifen"></i>
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
  data() {
    return {
      username: 'xxx3210161',
      phoneNumber: '18730270906'
    }
  },
  computed: {
    hiddenNumber() {
      return this.phoneNumber.substr(0, 3) + '****' + this.phoneNumber.substr(7)
    }
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
</style>

