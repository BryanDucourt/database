<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="10">
          <el-image :src="img" />
        </el-col>
        <el-col
          :span="8"
          :offset="4"
        >
          <el-card>
            <template #header>
              我的行程
            </template>
            <el-table
              :data="arrange"
              height="500"
            >
              <el-table-column
                prop="tn_id"
                label="车次"
              />
              <el-table-column
                prop="tn_setouttime"
                label="发车时间"
              />
              <el-table-column
                prop="tn_date"
                label="日期"
              />
              <el-table-column
                prop="from"
                label="起点"
              />
              <el-table-column
                prop="to"
                label="终点"
              />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "MainPage",
  data(){
    return {
      arrange: [],
      img : require('../assets/33.jpg')
    }
  },
  mounted() {
    let p = {}
    this.$api.ParamInterface.getOrder(p)
    .then(res=>{
      let data = res.data
      if (data.error_num===300){
        console.log(data)
        this.arrange = data.data
      }
    })
  }
}
</script>

<style scoped>

</style>