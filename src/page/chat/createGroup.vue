<template>
  <div class="main">
    <x-header>创建群聊</x-header>
    <div class="content">
      <x-input title="群名称:" v-model="form.groupName"></x-input>
      <x-input title="群ID:" v-model="form.groupId"></x-input>
      <x-textarea title="群描述" :max="100" v-model="form.instraction"></x-textarea>
      <flexbox style="margin-top: 10%;">
        <flexbox-item>
          <x-button type="primary" @click.native="createGroup">立即创建</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="warn" @click.native="reset">重置</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>
  import { XHeader, XInput, XTextarea, XButton, FlexboxItem, Flexbox, Toast } from 'vux'
  export default{
    components: {
      XHeader,
      XInput,
      XTextarea,
      XButton,
      FlexboxItem,
      Flexbox,
      Toast
    },
    data() {
      return {
        form: {
          groupId: '',
          groupName: '',
          instraction: '',
          ownerId: localStorage.getItem('userId'),
          userIds: [localStorage.getItem('userId')]
        }
      }
    },
    methods: {
      reset () {
        this.form = {
          groupId: '',
          groupName: '',
          instraction: '',
          ownerId: localStorage.getItem('userId'),
          userIds: [localStorage.getItem('userId')]
        }
      },
      createGroup () {
        this.$http.post(this.$domain + '/electric-design/create', this.form)
          .then((res) => {
            if (res.data.code === 200) {
              this.$vux.toast.show({
                text: '创建成功'
              })
            } else {
              this.$vux.toast.show({
                text: '创建失败'
              })
            }
          })
      }
    },
    mounted() {
      this.$one.test(this.$route.path)
    }
  }
</script>

<style scoped>
  .main {
    height: 100%;
    width: 100%;
    /*background-color: aliceblue;*/
  }

  .content {
    height: 80%;
    overflow: auto;
    padding:10px;
  }
</style>
