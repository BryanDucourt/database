<template>
  <div>
    <el-row>
      <el-col
        :span="6"
        :offset="2"
      >
        <el-card>
          <el-row>
            <span>
              起点：
            </span>
            <el-select
              v-model="from"
              @change="handleFrom"
            >
              <el-option
                v-for="item in cityList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-row>
        </el-card>
      </el-col>
      <el-col
        :span="6"
        :offset="1"
      >
        <el-card>
          <el-row>
            <span>
              终点：
            </span>
            <el-select
              v-model="to"
              @change="handleTo"
            >
              <el-option
                v-for="item in cityList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="(item.value)===from"
              />
            </el-select>
          </el-row>
        </el-card>
      </el-col>
      <el-col
        :span="6"
        :offset="1"
      >
        <el-card>
          <el-row>
            <span>
              出行日期：
            </span>
            <el-date-picker
              v-model="date"
              :disabled-date="disableDate"
              value-format="YYYY/MM/DD"
              @change="handleDate"
            />
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="20"
        :offset="2"
        style="margin-top: 30px"
      >
        <el-card>
          <el-table
            :data="tableData"
            @current-change="handleSelect"
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
    <el-row>
      <el-col
        :span="20"
        :offset="2"
        style="margin-top: 30px"
      >
        <el-card>
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
  </div>
</template>

<script>
export default {
  name: "LocPage",
  data(){
    return{
      cityList:[{value:1,label:1},{value:2,label:2},{value:3,label:3}],
      // loading: true,
      from: "",
      to: "",
      tableData:[],
      selected: [],
      date: "",
      disableDate(date){
          return date.getTime() <= Date.now()
    }
    }
  },
  mounted() {
    // 改为在api接口中统一设置user和token信息
    // let data={'user':this.$store.state.user,'token':this.$store.state.token}
    let data = {}
    this.$api.ParamInterface.loadCity(data).then(res => (
        this.cityList = res.data.data
    ))
  },
  beforeUnmount() {
    this.$emit('callback', {'selected':this.selected,'date':this.date})
  },
  methods:{
    handleFrom(value){
      this.from=value
      this.to = ''
    },
    handleTo(value){
      this.to=value
    },
    handleSelect(val){
      this.selected[0] = val
    },
    handleDate(){
      let data = {data:{'from': this.from, 'to': this.to, 'date': this.date}}
      this.$api.ParamInterface.loadTrainNum(data)
      .then(res=>{
        this.tableData = res.data.data
      })
    }


  }
}
</script>

<style scoped>

</style>