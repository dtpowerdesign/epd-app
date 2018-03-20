<template>
  <div class="index">
    <x-header title="聊天" :left-options="{showBack: false}" :right-options="{showMore: true}" @on-click-more="showMenus = true">
    </x-header>
    <swipeout class="vux-1px-tb">
      <swipeout-item transition-mode="follow" v-for="(item, i) in recentMessage" :key="i" @click.native="chatIm(item)">
        <div slot="right-menu">
          <swipeout-button type="warn">{{ '删除' }}</swipeout-button>
        </div>
        <div slot="content" :class="{'vux-1px-b': i !== 3, 'vux-1px-t': i === 1}" style="padding:12px;">
          <img class="img-box" src="../../assets/19424162.jpg" alt="头像">
          {{ item.toName }}
        </div>
      </swipeout-item>
    </swipeout>
    <divider v-show="!recentMessage.length > 0">暂无数据</divider>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="addFriend" show-cancel></actionsheet>
    </div>
  </div>
</template>
<script>
import {
  XHeader,
  TransferDom,
  Actionsheet,
  Swipeout,
  SwipeoutItem,
  SwipeoutButton,
  Divider
} from 'vux'
export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Actionsheet,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    Divider
  },
  data() {
    return {
      menus: {
        menu1: '添加好友'
      },
      showMenus: false,
      recentMessage: []
    }
  },
  methods: {
    chatIm(item) {
      let userId = item.otherUserId
      this.$store.commit('setToUserId', userId)
      this.$router.push('/index/chat/main')
    },
    fetchRecentMessage(userId) {
      this.$http
        .post(this.$domain + '/electric-design/getCurrentLinkMan', {
          userId: userId
        })
        .then(response => {
          if (response.status === 200) {
            let messageLists = response.data
            messageLists.forEach(element => {
              this.recentMessage.push(element)
            })
          } else {
            this.$vux.toast.text(response.statusText, 'top')
          }
        })
        .catch(error => {
          console.log('Inside error, fetching product line items failed', error)
        })
    },
    addFriend(menuKey, menuItem) {
      if (menuItem === '添加好友') {
        this.$router.push('/index/chat/add')
      }
    }
  },
  mounted() {
    this.fetchRecentMessage(localStorage.getItem('userId'))
  }
}
</script>
<style scoped>
.index {
  height: 100%;
  background-color: aliceblue;
  overflow: scroll;
}
.img-box {
  display: inline-block;
  width: 4em;
  height: 4em;
  border-radius: 2em;
  margin-right: 5px;
}
.vux-swipeout-item {
  border-bottom: 1px solid #dadada;
}
.vux-swipeout-content > div {
  display: flex;
  align-items: center;
}
</style>

