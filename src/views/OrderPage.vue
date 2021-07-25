<template>
  <el-container style="height: 100%">
    <el-header height="5%">
      <el-steps
        finish-status="success"
        :active="status"
        simple
        process-status="finish"
      >
        <el-step
          icon="el-icon-location"
          title="选择起始点"
        />
        <el-step
          icon="el-icon-user"
          title="选择乘车人"
        />
        <el-step
          icon="el-icon-cash"
          title="支付订单"
        />
      </el-steps>
    </el-header>
    <el-main style="height: 85%">
      <router-view
        style="height: 100%"
        @callback="handleChildCallback"
        :params="params"
      />
    </el-main>
    <el-footer>
      <el-row>
        <el-col
          :span="2"
          :offset="20"
        >
          <el-button
            @click="next"
            type="primary"
            v-if="status!==2"
          >
            next
          </el-button>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "OrderPage",
  data(){
    return{
      status: 0,
      param: [],
      params: ['test']
    }
  },
  mounted() {
    this.$router.push("/location")
  },
  methods:{
    next(){
      switch (this.status){
        case 0:
          this.$router.push("/cus")
          break
        case 1:
          this.$router.push("/pay")
          break
      }
      this.status+=1

    },
    handleChildCallback(param){
      // this.param = param
      this.params = param
      if (param===0){
        this.$emit('callback',"/main")
      }
      else if (param===1)
      {
        this.$router.push('/cus')
      }

    }
  }
}
</script>

<style scoped>

</style>