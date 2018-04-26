<template>
  <div class="main">
    <x-header class="header" title="发布任务" :left-options="{showBack: false}"></x-header>
    <!--<group >-->
    <!--<x-input title="任务名称"></x-input>-->
    <!--</group>-->
    <!--<group title="任务地点">-->
    <!--<x-address title="地点" :list="addressData"></x-address>-->
    <!--</group>-->
    <!--<group title="详细描述">-->
    <!--<x-textarea :max="200" placeholder="详细描述" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>-->
    <!--</group>-->
    <div class="content">
      <group>
        <group-title solt="title" class="title">任务基本信息</group-title>
        <x-input title="项目名称" v-model="form.name"></x-input>
        <x-switch title="是否接受联合投标" v-model="form.isAcceptJointBid"></x-switch>
        <x-input title="招标公司" v-model="form.company"></x-input>
        <selector title="类别" :options="categorys" v-model="form.categorys"></selector>
        <divider>关于投标</divider>
        <x-switch title="发布完是否立即投标" v-model="form.state"></x-switch>
        <x-input title="规模" placeholder="请输入规模的数值" type="number" v-model="form.sizeAndCapacitys"></x-input>
        <selector title="单位" :options="unit" v-model="form.unit"></selector>
        <hr>
        <selector title="设计阶段" :options="designState" v-model="form.designState"></selector>
        <checklist title="类型" :options="type" v-model="form.type"></checklist>
        <checklist title="涉及专业" :options="major" v-model="form.major"></checklist>
        <divider>电压等级</divider>
        <selector title="电压类型" :options="voltagetype" v-model="form.voltagelevel1"></selector>
        <x-input title="电压大小" v-model="form.voltagelevel2" type="number"></x-input>
        <selector title="单位" :options="voltagelevel" v-model="form.voltagelevel3"></selector>
        <hr>
        <x-input title="项目地点" v-model="form.place"></x-input>
        <datetime title="开始时间" v-model="form.startTime"></datetime>
        <datetime title="结束时间" v-model="form.endTime"></datetime>
        <divider>工程限价</divider>
        <x-input title="最低" v-model="form.lowPrice" type="number"></x-input>
        <x-input title="最高" v-model="form.highPrice" type="number"></x-input>
        <hr>
        <selector title="目前状态" :options="projectNowStates" v-model="form.projectNowState"></selector>
        <divider>详细描述</divider>
        <x-textarea :height="100" :max="300" v-model="form.instruction"></x-textarea>
        <divider>项目要求</divider>
        <x-textarea :height="100" :max="300" v-model="form.requirement"></x-textarea>
      </group>

      <group>
        <group-title solt="title" class="title">项目资质要求</group-title>
        <selector title="投标个体性质" :options="character" v-model="form.character"></selector>
        <divider>业绩要求</divider>
        <selector title="请选择业绩要求" :options="performanceReq" v-model="form.performanceReq1"></selector>
        <x-input title="数量" v-model="form.performanceReq2" type="number"></x-input>
        <divider>所有资质</divider>
        <x-textarea :height="100" :max="300" v-model="form.aptitude"></x-textarea>
      </group>

      <group>
        <group-title solt="title" class="title">付款相关</group-title>
        <selector title="付款方式" :options="paymentMethods" v-model="form.paymentMethods"></selector>
        <x-input title="付款比例" v-model="form.paymentScale"></x-input>
        <x-switch title="是否有发票" v-model="form.hasInvoice"></x-switch>
        <divider>付款描述</divider>
        <x-textarea :max="300" :height="100" v-model="form.payDiscible"></x-textarea>
      </group>

      <group>
        <group-title solt="title" class="title">项目设计成果要求</group-title>
        <group v-for="i in stateCount" :key="i">
          <group-title solt="title" class="state-title">阶段{{i}}</group-title>
          <selector title="设计阶段" :options="designState" v-model="form.stateUnits[i-1].state"></selector>
          <datetime title="要求时间" v-model="form.stateUnits[i-1].endTime"></datetime>
          <p style="margin-left:13px;">要求成果</p>
          <x-textarea :max="300" :height="50" v-model="form.stateUnits[i-1].requireResult"></x-textarea>
          <flexbox :gutter="20">
            <flexbox-item>
              <x-button text="删除阶段" type="warn" @click.native="deleteState(i-1)" style="width:70%;"></x-button>
            </flexbox-item>
            <flexbox-item>
              <x-button text="增加阶段" type="primary" @click.native="addState" style="width:70%;"></x-button>
            </flexbox-item>
          </flexbox>
        </group>
      </group>

      <flexbox>
        <flexbox-item>
          <x-button type="primary" @click.native="submit">发布</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="warn" @click.native="reset">重置</x-button>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>
<script>
  import {
    XHeader,
    Group,
    XInput,
    XTextarea,
    XAddress,
    ChinaAddressV4Data,
    XButton,
    Flexbox,
    FlexboxItem,
    XSwitch,
    Selector,
    Checker,
    CheckerItem,
    Divider,
    Datetime,
    GroupTitle,
    Checklist,
    Alert
  } from 'vux'
  export default {
    components: {
      XHeader,
      Group,
      XInput,
      XTextarea,
      XAddress,
      XButton,
      Flexbox,
      FlexboxItem,
      XSwitch,
      Selector,
      Checker,
      CheckerItem,
      Divider,
      Datetime,
      GroupTitle,
      Checklist,
      Alert
    },
    data() {
      return {
        stateCount: 1,
        addressData: ChinaAddressV4Data,
        stepName: ['身份选择', '填写项目信息', '最终确认'],
        steps: [1, 2, 3, 4, 5, 6],
        step: 1,
        description: ['发布新项目前选择您的身份，方便项目的填写，若您对表单不了解，会由工作人员协同您填写', '在此页面填写与项目有关的基本信息,方便设计人员了解您的项目，有利于项目的进行', '最后确认您的项目信息，点击确认即可发布', '步骤四的说明', '步骤五的说明', '步骤六的说明'],
        radioStep1: '',
        form: {
          dataOrProject: 'project',
          company: '某某公司',
          name: '项目',
          state: false,
          sizeAndCapacitys: '',
          categorys: '',
          unit: '',
          type: [],
          voltagelevel1: '',
          voltagelevel2: 100,
          voltagelevel3: '',
          place: '',
          major: [],
          designState: '',
          startTime: '',
          endTime: '',
          character: '',
          performanceReq1: '',
          performanceReq2: '',
          lowPrice: '暂无',
          highPrice: '暂无',
          priceType: '',
          aptitude: '',
          paymentMethods: '',
          paymentScale: '',
          isAcceptJointBid: true,
          instruction: '',
          requirement: '',
          payDiscible: '',
          projectNowState: '',
          hasInvoice: 'no',
          stateUnits: [
            {state: '未填', endTime: '未填', requireResult: '未填'}
          ]
        },
        qualificationRequirements: {CET: ''},
        projectCharacteristics: {difficulty: '', price: ''},
        unit: ['MW', 'Kva', 'KV', `M^2`],
        existingData: {detail: ''},
        states: [{'value': '发布中', 'label': '发布完不立即招标'}, {'value': '投标中', 'label': '发布完直接招标'}],
        major: ['计算机', '电力', '岩土', '绘测'],
        designState: ['前期', '项目建议书', '可行性研究报告', '招投标', '初步设计', '施工图设计', '竣工图编制'],
        sizeAndCapacitys: ['MW', 'KW', 'kVA'],
        categorys: ['火电', '水电', '风电', '光伏', '核电', '储能', '电气设备', '充电桩', '工业民用建筑'],
        type: ['发电厂', '输电', '变电', '供配电', '建筑'],
        voltagelevel: ['KV', 'V'],
        voltagetype: ['直流', '交流'],
        character: ['单位', '公司'],
        performanceReq: ['同类型同规模', '同类型'],
        priceType: ['最低', '最高'],
        aptitude: ['高资质', '低资质'],
        paymentMethods: ['一次性付款', '分阶段付款'],
        paymentScale: ['1:1', '2:1', '3:1'],
        projectNowStates: ['未开始', '项目建议书', '可研已定', '初设已定', '施工图已定', '竣工图已定']
      }
    },
    methods: {
      onEvent(event) {
        console.log(event)
      },
      addState() {
        this.form.stateUnits.push({state: '未填', endTime: '未填', requireResult: '未填'})
        this.stateCount++
      },
      deleteState(i) {
        if (this.stateCount === 1) {
          return this.stateCount
        } else {
          this.form.stateUnits.splice(i, 1)
          this.stateCount--
        }
      },
      submit() {
        if (this.form.state) {
          this.form.state = '投标中'
        } else {
          this.form.state = '发布中'
        }
        this.form.categorys = this.form.categorys === true ? '' : this.form.categorys
        this.form.unit = this.form.unit === true ? '' : this.form.unit
        this.form.designState = this.form.designState === true ? '' : this.form.designState
        this.form.voltagelevel1 = this.form.voltagelevel1 === true ? '' : this.form.voltagelevel1
        this.form.voltagelevel3 = this.form.voltagelevel3 === true ? '' : this.form.voltagelevel3
        this.form.projectNowState = this.form.projectNowState === true ? '' : this.form.projectNowState
        this.form.character = this.form.character === true ? '' : this.form.character
        this.form.performanceReq1 = this.form.performanceReq1 === true ? '' : this.form.performanceReq1
        this.form.paymentMethods = this.form.paymentMethods === true ? '' : this.form.paymentMethods
        this.form.hasInvoice = this.form.hasInvoice === true ? 'yes' : this.form.hasInvoice
        console.log('data:test:' + this.form.categorys)
        var data = {
          'sourceAccount': localStorage.getItem('userId'),
          'releaseUserAccount': localStorage.getItem('userId'),
          'dataOrProject': 'project',
          'tenderCompany': this.form.company,
          'name': this.form.name,
          'changeName': this.form.name,
          'state': this.form.state,
          'sizeCapacityNumber': this.form.sizeAndCapacitys,
          'sizeAndCapacity': this.form.unit,
          'bidType': this.form.character,
          'type': this.form.type,
          'category': this.form.categorys,
          'voltagelevel': this.form.voltagelevel1 + '/' + this.form.voltagelevel2 + '/' + this.form.voltagelevel3,
          'major': this.form.major,
          'address': this.form.place,
          'performanceRequirements': this.form.performanceReq1 + '/数量要求:' + this.form.performanceReq2,
          'designProcess': this.form.designState,
          'amountOfInvestment': this.form.lowPrice + '-' + this.form.highPrice,
          'lowestPrice': this.form.lowPrice,
          'highestPrice': this.form.highPrice,
          'instruction': this.form.instruction,
          'requirement': this.form.requirement,
          'payDiscible': this.form.payDiscible,
          'projectNowState': this.form.projectNowState,
          'hasInvoice': this.form.hasInvoice,
          'qualificationRequirements': this.form.aptitude,
          'startTime': this.form.startTime,
          'endTime': this.form.endTime,
          'payMethod': this.form.paymentMethods + '/' + this.form.paymentScale,
          'isAcceptJointBid': this.form.isAcceptJointBid,
          'processRequirements': this.form.stateUnits
        }
        this.$http.post(this.$domain + '/electric-design/addProject1', data).then((res) => {
          console.log(data)
          console.log(res.data)
          if (res.data.result) {
            this.$vux.alert.show({
              content: '发布成功'
            })
            this.$router.push('/index/project/total')
          } else {
            this.$vux.alert.show({
              content: `发布失败，原因${res.data.reason}`
            })
          }
        }).catch((err) => { console.log(err) })
      },
      reset() {
        this.stateCount = 1
        this.form = {
          dataOrProject: 'project',
          company: '某某公司',
          name: '项目',
          state: false,
          sizeAndCapacitys: '',
          categorys: '',
          unit: '',
          type: [],
          voltagelevel1: '',
          voltagelevel2: 100,
          voltagelevel3: '',
          place: '',
          major: [],
          designState: '',
          startTime: '',
          endTime: '',
          character: '',
          performanceReq1: '',
          performanceReq2: '',
          lowPrice: '暂无',
          highPrice: '暂无',
          priceType: '',
          aptitude: '',
          paymentMethods: '',
          paymentScale: '',
          isAcceptJointBid: true,
          instruction: '',
          requirement: '',
          payDiscible: '',
          projectNowState: '',
          hasInvoice: 'no',
          stateUnits: [
            {state: '未填', endTime: '未填', requireResult: '未填'}
          ]
        }
        this.$vux.alert.show({
          content: '重置成功！'
        })
      }
    }
  }
</script>
<style scoped>
  .vux-flexbox {
    margin-top: 20px !important;
  }

  .chose {
    width: 40px;
    height: 40px;
    border: 2px solid #ccc;
    display: inline-block;
    border-radius: 50%;
    line-height: 40px;
    text-align: center;
    background-color: #c8c7cd;
    font-size: 15px
  }

  .chosen {
    background-color: #6b76cc;
  }

  .main {
    height: 100%;
    overflow: scroll;
  }

  .content {
    height: 80%;
    overflow: scroll;
  }

  .title {
    font-size: 25px;
    color: #000;
  }

  .state-title {
    font-size: 20px;
    color: blue;
  }
</style>

