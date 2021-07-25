<template>
  <el-container style="height: 100%">
    <el-header style="height: 10%">
      <el-row>
        <el-col
          :span="16"
          :offset="4"
        >
          <el-card>
            <el-row :gutter="2">
              <el-col :span="4">
                选择车站
              </el-col>
              <el-col :span="8">
                <el-select
                  v-model="station"
                  @change="handleSelect"
                >
                  <el-option
                    v-for="item in cityList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="height: 60%;margin: 0; padding: 0">
      <el-row style="height: 100%;">
        <el-col
          :span="7"
          :offset="4"
          style="height: 100%"
        >
          <el-card style="height: 100%;">
            <template #header>
              出发
            </template>
            <el-table
              :data="fromTable"
              height="700"
            >
              <el-table-column
                prop="tn_id"
                label="车次"
              />
              <el-table-column
                prop="tn_setouttime"
                label="出发时间"
              />
              <el-table-column
                prop="tn_runtime"
                label="预计运行时间"
              />
              <el-table-column
                prop="tn_to"
                label="目的地"
              />
            </el-table>
          </el-card>
        </el-col>
        <el-col
          :span="7"
          :offset="2"
          style="height: 100%"
        >
          <el-card style="height: 100%;">
            <template #header>
              到达
            </template>
            <el-table
              :data="toTable"
              height="700"
            >
              <el-table-column
                prop="tn_id"
                label="车次"
              />
              <el-table-column
                prop="tn_setouttime"
                label="出发时间"
              />
              <el-table-column
                prop="tn_runtime"
                label="预计运行时间"
              />
              <el-table-column
                prop="tn_from"
                label="始发站"
              />
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
  name: "TimeTablePage",
  data(){
    return {
      station:'',
      cityList:[],
      fromTable:[],
      toTable:[]
    }
  },
  mounted() {
    let data = {}
    this.$api.ParamInterface.loadCity(data).then(res=>{
      this.cityList = res.data.data
    })
  },
  methods:{
    handleSelect(){
      let param = {'station': this.station}
      this.$api.ParamInterface.getTimetable(param)
      .then(res=>{
        let data = res.data
        if (data.error_num===300){
          let d = data.data
          this.fromTable = d.from
          this.toTable = d.to
        }
        else {
          ElMessage.error({
            message: data.msg
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>