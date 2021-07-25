<template>
  <el-container style="height: 100%">
    <el-main style="height: 100%;">
      <el-row style="height: 60%">
        <el-col
          :span="10"
          :offset="1"
        >
          <el-card
            id="chart1"
            style="height: 100%"
            ref="chart1"
          >
            <template #header>
              最热门出行地点
            </template>
          </el-card>
        </el-col>
        <el-col
          :span="10"
          :offset="2"
        >
          <el-card
            id="chart2"
            style="height: 100%"
          >
            <template #header>
              出行人数最多时间
            </template>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "ChartPage",
  data(){
    return {
      chart1: null,
      popular: {},
      timet: []
    }
  },
  methods: {
    init(){
      console.log(this.popular)
      this.chart2 = this.$echarts.init(document.getElementById('chart2'))
      this.chart1 = this.$echarts.init(document.getElementById('chart1'))
      let option = {
        title:{
          show: true,
          text: '最热门地点',
          x:'center',
          y:'top'
        },
         xAxis: { type: 'category', data: this.popular.label }, //X轴
         yAxis: { type: 'value' }, //Y轴
         series: [{ data: this.popular.value, type: 'bar' }] //配置项
      };
      let Op2={
        title: {
          show: true,
          text: '热门出行时间',
          x:'center',
          y:'top'
        },
        series: [{
          name:'出行时间',
          type:'pie',
          roseType:'angle',
          radius:'55%',
          data: this.timet,

        }

        ]
      }
 // 4.传入数据
       this.chart1.setOption(option);
      this.chart2.setOption(Op2)
    },
    getPopular(){

    }
  },
  mounted() {
    let data = {}
    // let requests = [this.$api.ParamInterface.getPopular(data),]
    this.$api.ParamInterface.getPopular(data).then(resp =>{
      let data = resp.data
      if (data.error_num===300){
        this.popular = data.data
      }
      this.$api.ParamInterface.getTime({}).then(
          res=>{
            let data = res.data
            if (data.error_num===300){
              this.timet = data.data
            }this.init()
          }
      )

    })
      // this.$api.ParamInterface.getPopular(data)
      // .then(res => {
      //   let t = res.data
      //   if (t.error_num===300){
      //     this.popular = t.data
      //     this.init()
      //   }
      // })

  }
}
</script>

<style scoped>

</style>