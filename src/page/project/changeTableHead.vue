<template>
  <div class="main">
    <x-header>选择显示的内容</x-header>
    <p>您已选的</p>
    <div class="cardOne">
      <div v-for="(item,index) in selected" :key="index" :id="index" class="before-select after-selected"
           @click="remove(item)">
        {{items[item]}}
        <icon type="clear" class="close"></icon>
      </div>
    </div>
    <p>所有类别</p>
    <div class="cardTwo">
      <!--<div-->
      <!--v-for="(item, index) in items"-->
      <!--:id="index"-->
      <!--:key="index"-->
      <!--class="before-select after-selected"-->
      <!--@click="add(index)"-->
      <!--v-show="selected.indexOf(index)!=-1"-->
      <!--&gt;{{item}}-->
      <!--</div>-->
      <div
        v-for="(item, index) in items"
        :id="index"
        :key="index"
        class="before-select"
        @click="add(index)"
      >{{item}}
      </div>
    </div>
    <x-button text="提交" type="primary" style="width:60%;margin-top: 10%" @click.native="submit"></x-button>
  </div>
</template>

<script>
  import { XHeader, Icon, XButton, AlertPlugin } from 'vux'
  import Vue from 'vue'
  Vue.use(AlertPlugin)
  export default {
    components: {
      XHeader,
      Icon,
      XButton,
      AlertPlugin
    },
    data () {
      return {
        selected: [],
        items: [],
        flag: true
      }
    },
    methods: {
      add(index) {
        if (this.selected.indexOf(index) === -1) {
          this.selected.push(index)
          document.getElementById(index).classList.add('after-selected')
        } else {
          this.selected.splice(this.selected.indexOf(index), 1)
          document.getElementById(index).classList.remove('after-selected')
        }
//        console.log(this.selected)
      },
      remove(index) {
        this.selected.splice(this.selected.indexOf(index), 1)
        document.getElementById(index).classList.remove('after-selected')
//        console.log(index)
//        console.log(this.selected)
      },
      submit() {
        if (this.selected.length === 0) {
          this.$vux.alert.show({
            title: '请选择要显示的表头'
          })
        } else {
          let data = {}
          data['project'] = this.selected
          console.log(data)
          this.$http.post(this.$domain + '/electric-design/updateTableRecod', {
            'table': 'tableheade',
            'keyNames': ['belongToUser'],
            'keyValues': [localStorage.getItem('userId')],
            'newJsonData': data
          }).then(res => {
            if (res.data.result) {
              this.$vux.alert.show({
                title: '保存成功'
              })
            } else {
              this.$vux.alert.show({
                title: res.data.reason
              })
            }
          })
        }
      },
      initData() {
        this.$http.post(this.$domain + '/electric-design/getAllkeysAndExplainOfTable',
          {'table': 'projects'}
        ).then(res => {
          this.items = res.data
//          console.log(this.items)
//          console.log(res.data)
        })
        this.$http.post(this.$domain + '/electric-design/getShowKeyAndExplain',
          {'belongToUser': localStorage.getItem('userId'), 'table': 'projects', 'otherName': 'project'})
          .then(res => {
            let data = JSON.stringify(res.data)
            let a = data.substring(1, data.length - 1)
            let b = a.split(',')
            for (let i = 0; i < b.length; i++) {
              let temp = b[i].split(':')
              let t = temp[0].substring(1, temp[0].length - 1)
//              console.log(t)
              this.selected.push(t)
            }
            console.log(this.selected)
//            for (let i = 0; i < this.selected.length; i++) {
//              console.log(this.selected[i][0])
//              document.getElementById('changeName').classList.add('after-selected')
//            }
            setTimeout(() => {
              for (let i = 0; i < this.selected.length; i++) {
//                console.log(this.selected[i][0])
                document.getElementById(this.selected[i]).classList.add('after-selected')
              }
            }, 200)
          })
      }
    },
    mounted() {
      this.initData()
      this.$one.test(this.$route.path)
    }
  }
</script>

<style>
  .close {
    position: absolute;
    right: -6px;
    top: -3px;
  }

  .before-select {
    position: relative;
    display: inline-block;
    width: 30%;
    margin-left: 2%;
    background-color: #f3f2f9;
    padding: 5px 10px;
    box-sizing: border-box;
    text-align: center;
    margin-bottom: 2%;
    border: 1px solid #d1d1d1;
  }

  .after-selected {
    border: 1px solid #00a9b8;
  }

  .main {
    height: 100%;
  }

  .cardOne {
    max-height: 20%;
    overflow: auto;
    border: 1px solid #c4c4c4;
  }

  .cardTwo {
    height: 40%;
    overflow: auto;
    border: 1px solid #c4c4c4;
  }
</style>
