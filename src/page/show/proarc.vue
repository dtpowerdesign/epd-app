<template>
  <div class="main">
    <x-header class="header" title="任务列表" :left-options="{preventGoBack: true}" @on-click-back="goback"></x-header>
    <!--<pull-to :top-load-method="refresh">-->

    <!--</pull-to>-->
    <!--<load-more tip="暂无数据" background-color="#fbf9fe" :show-loading="false" v-show="isShow"></load-more>-->
    <flexbox :gutter="1">
      <flexbox-item class="order-son">
        开始时间
        <span class="updown">
          <i class="up" @click="timeLtH('startTime')"></i>
          <i class="down" @click="timeHtL('startTime')"></i>
        </span>
      </flexbox-item>
      <flexbox-item class="order-son">结束时间
        <span class="updown">
          <i class="up" @click="timeLtH('endTime')"></i>
          <i class="down" @click="timeHtL('endTime')"></i>
        </span></flexbox-item>
      <flexbox-item class="order-son">最低限价
        <span class="updown">
          <i class="up" @click="LtH('lowestPrice')"></i>
          <i class="down" @click="HtL('lowestPrice')"></i>
        </span></flexbox-item>
      <flexbox-item class="order-son">最高限价
        <span class="updown">
          <i class="up" @click="LtH('highestPrice')"></i>
          <i class="down" @click="HtL('highestPrice')"></i>
        </span></flexbox-item>
    </flexbox>
    <div class="content">
      <div class="perbid" v-for="(i,j) in projectList" :key="j" @click="goDetail(i.code)">
        <p>
          <i class="iconfont icon-jiankangjianchajieguohuizong"></i>
          <span style="margin-left: 4px">项目名称：</span>
          <span>{{i.name}}</span>
        </p>
        <p>
          <i class="iconfont icon-aui-icon-location"></i>
          <span style="margin-left: 4px">项目地点：</span>
          <span>{{i.address}}</span>
        </p>
        <p>
          <i class="iconfont icon-jifen"></i>
          <span style="margin-left: 4px">投资金额：</span>
          <span>{{i.amountOfInvestment}}</span>
        </p>
        <p>
          <i class="iconfont icon-shijian"></i>
          <span style="margin-left: 4px">起止时间：</span>
          <span>{{formatTime(i.startTime)}}至{{formatTime(i.endTime)}}</span>
        </p>
      </div>

    </div>
  </div>
</template>
<script>
  import { XHeader, LoadMore, FlexboxItem, Flexbox, XButton } from 'vux'
  //下拉插件
  import PullTo from 'vue-pull-to'
  export default {
    components: {
      XHeader,
      LoadMore,
      PullTo,
      FlexboxItem,
      Flexbox,
      XButton
    },
    methods: {
      timeLtH(prop) {
        let index = []
        let temp = []
        for (let i = 0; i < this.projectList.length; i++) {
          if (this.projectList[i][prop] === '暂无数据') {
            index.push(i)
          }
        }
        for (let i = 0; i < index.length; i++) {
          temp.push(this.projectList[index[i] - i])
          this.projectList.splice(index[i] - i, 1)//减去一个数组后后面的数组索引要向前移动一位
        }
        this.projectList.sort(
          function (obj1, obj2) {
            var val1 = obj1[prop]['time']
            var val2 = obj2[prop]['time']
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
              val1 = Number(val1)
              val2 = Number(val2)
            }
            if (val1 < val2) {
              return -1
            } else if (val1 > val2) {
              return 1
            } else {
              return 0
            }
          }
        )
        for (let i = 0; i < temp.length; i++) {
          this.projectList.push(temp[i])
        }
      },
      timeHtL(prop) {
        let index = []
        let temp = []
        for (let i = 0; i < this.projectList.length; i++) {
          if (this.projectList[i][prop] === '暂无数据') {
            index.push(i)
          }
        }
        for (let i = 0; i < index.length; i++) {
          temp.push(this.projectList[index[i] - i])
          this.projectList.splice(index[i] - i, 1)//减去一个数组后后面的数组索引要向前移动一位
        }
        this.projectList.sort(
          function (obj1, obj2) {
            var val1 = obj1[prop]['time']
            var val2 = obj2[prop]['time']
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
              val1 = Number(val1)
              val2 = Number(val2)
            }
            if (val1 > val2) {
              return -1
            } else if (val1 < val2) {
              return 1
            } else {
              return 0
            }
          }
        )
        for (let i = 0; i < temp.length; i++) {
          this.projectList.push(temp[i])
        }
      },
      LtH(prop) {
        let index = []
        let temp = []
        for (let i = 0; i < this.projectList.length; i++) {
          if (this.projectList[i][prop] === '暂无' || this.projectList[i][prop] === '暂无1') {
            index.push(i)
          }
        }
        for (let i = 0; i < index.length; i++) {
          temp.push(this.projectList[index[i] - i])
          this.projectList.splice(index[i] - i, 1)//减去一个数组后后面的数组索引要向前移动一位
        }
        this.projectList.sort(
          function (obj1, obj2) {
            var val1 = obj1[prop]
            var val2 = obj2[prop]
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
              val1 = Number(val1)
              val2 = Number(val2)
            }
            if (val1 < val2) {
              return -1
            } else if (val1 > val2) {
              return 1
            } else {
              return 0
            }
          }
        )
        for (let i = 0; i < temp.length; i++) {
          this.projectList.push(temp[i])
        }
      },
      HtL(prop) {
        let index = []
        let temp = []
        for (let i = 0; i < this.projectList.length; i++) {
          if (this.projectList[i][prop] === '暂无' || this.projectList[i][prop] === '暂无1') {
            index.push(i)
          }
        }
        for (let i = 0; i < index.length; i++) {
          temp.push(this.projectList[index[i] - i])
          this.projectList.splice(index[i] - i, 1)//减去一个数组后后面的数组索引要向前移动一位
        }
        this.projectList.sort(
          function (obj1, obj2) {
            var val1 = obj1[prop]
            var val2 = obj2[prop]
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
              val1 = Number(val1)
              val2 = Number(val2)
            }
            if (val1 > val2) {
              return -1
            } else if (val1 < val2) {
              return 1
            } else {
              return 0
            }
          }
        )
        for (let i = 0; i < temp.length; i++) {
          this.projectList.push(temp[i])
        }
      },
      goback() {
        this.$router.goBack()
      },
      refresh(loaded) {
        loaded('done')
      },
      formatTime(obj) {
        let year = obj.year + 1900 || 0
        let month = obj.month + 1 || 0
        let day = obj.date || 0
        return `${year}-${month}-${day}`
      },
      goDetail(code) {
        this.$router.push({
          path: 'project/detail',
          query: {
            code: code
          }
        })
      },
      initData() {
        this.$http.post(this.$domain + '/electric-design/getProjectsByMultiConditions ',
          {'conditions': {'type': {'searchMethod': 'values', 'values': [this.$route.query.type]}}}
        ).then(res => {
          for (let i = 0; i < res.data.length; i++) {
            this.projectList.push(res.data[i])
          }
          console.log(this.projectList)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    data() {
      return {
        isShow: true,
        projectList: []
      }
    },
    mounted() {
      this.initData()
      this.$one.test(this.$route.path)
    }
  }
</script>
<style scoped>
  .vux-header {
    position: relative;
    z-index: 999;
  }

  .demo3-slot {
    text-align: center;
    padding: 8px 0;
    color: #888;
  }

  .main {
    background-color: #f0f8ff;
    height: 100%;
    width: 100%;
  }

  .content {
    max-height: 85%;
    overflow: auto;
  }

  .perbid {
    margin: 10px;
    padding: 5px;
    background-color: #edede9;
    border: 2px solid #ccc;
    box-shadow: 5px 5px 10px #888888;
    border-radius: 10px;
  }

  .order-son {
    background: linear-gradient(#f8f8f8, #d9d9d9);
    /*background-color: #cccccc;*/
    text-align: center;
    line-height: 35px;
  }


  .up {
    display: inline-block;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid black;
  }

  .down {
    display: inline-block;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid black;
  }

  .updown {
    display: inline-block;
    transform: rotate(90deg);
  }
</style>


