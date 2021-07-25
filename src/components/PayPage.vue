<template>
  <el-container>
    <el-header style="height: 30%">
      <el-row style="margin-top: 30px">
        <el-col
          :span="20"
          :offset="2"
        >
          <el-card>
            <template #header>
              车次信息
            </template>
            <el-row>
              出行日期：{{ date }}
            </el-row>
            <el-table :data="selected">
              <el-table-column
                prop="tn_id"
                label="车次"
              />
              <el-table-column
                prop="tn_setouttime"
                label="发车时间"
              />
              <el-table-column
                prop="tn_ticket"
                label="余票"
              />
              <el-table-column
                prop="tn_price"
                label="票价"
              />
              <el-table-column
                prop="tn_runtime"
                label="预计用时"
              />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="margin-top: 30px">
      <el-row style="margin-top: 30px">
        <el-col
          :span="20"
          :offset="2"
        >
          <el-card>
            <template #header>
              <span>
                乘客信息
              </span>
            </template>
            <el-table :data="passengers">
              <el-table-column
                prop="u_name"
                label="姓名"
              />
              <el-table-column
                prop="u_phone"
                label="手机号"
              />
              <el-table-column
                prop="u_identity"
                label="证件号"
              />
              <el-table-column
                prop="u_account_id"
                label="账户"
              />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top: 100px;">
        <el-col>
          <el-button
            type="primary"
            :disabled="state"
            @click="handlePay"
          >
            {{ content }}
          </el-button>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "PayPage",
  props: {
    params:{
      type: Object,
      default: null,
    }
  },
  mounted() {
    let clock=window.setInterval(()=>{
      this.content="检查您的订单("+this.ctd+"s)"
      this.ctd--
      if (this.ctd<0){
        this.state=false
        this.content="支付"
        window.clearInterval(clock)
      }
    }, 1000)
  },
  data(){
    return {
      selected: [],
      passengers: [],
      content: "",
      state:true,
      ctd: 15,
      date:""
    }
  },
  watch:{
    params: function (){
      this.selected = this.params.selected
      this.passengers = this.params.passengers
      this.date = this.params.date
    }
  },
  methods:{
    handlePay(){
      let data = {
        'data':{
          'date':this.date,
          'selected': this.selected,
          'passengers': this.passengers,
        }
      }
      this.$api.ParamInterface.createOrder(data)
      .then(res=>{
        let data = res.data
        if (data.error_num===300){
          ElMessage.success({
            message:"购票成功"
          })
          this.$emit('callback',0)
        }
        else {
          ElMessage.error({
            message: "错误，请重新购票"
          })
          this.$emit('callback', 1)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>