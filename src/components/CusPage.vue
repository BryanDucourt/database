<template>
  <el-container>
    <el-header style="height: 30%">
      <el-row style="margin-top: 30px">
        <el-col
          :span="20"
          :offset="2"
        >
          <el-card>
            <el-row>
              出行日期：{{ date }}
            </el-row>
            <el-divider />
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
    <el-main>
      <el-row style="margin-top: 30px">
        <el-col
          :span="20"
          :offset="2"
        >
          <el-card>
            <el-row :gutter="2">
              <el-col :span="4">
                <el-switch
                  v-model="method"
                  active-value="spec"
                  inactive-value="fuzzy"
                  active-text="精确查询"
                  inactive-text="模糊查询"
                />
              </el-col>
              <el-col :span="18">
                <el-autocomplete
                  v-model="se_pass"
                  :fetch-suggestions="findUser"
                  :trigger-on-focus="false"
                  placeholder="请输入乘车人姓名，支持模糊查询和精确查询"
                  @select="handleSelect"
                />
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top: 30px">
        <el-col
          :span="20"
          :offset="2"
        >
          <el-card>
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
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  props: {
    params:{
      type: Array,
      default: null
    }
  },
  watch: {
    params: function () {
      this.selected=this.params.selected
      this.date = this.params.date
    }
  },
  name: "CusPage",
  data(){
    return {
      selected: [],
      passengers: [],
      method: 'fuzzy',
      se_pass: '',
      date: ""
    }
  },
  methods:{
    handleDelete(index, row){
      this.passengers.splice(row, 1)
    },
    handleSelect(item){
      this.passengers.push(item.data)
    },
    findUser(name, cb){
      let data = {'name': name, 'method': this.method}
      let options=[]
      this.$api.ParamInterface.fineUser(data)
      .then(res=>{
        let data = res.data.data
        if (data.length !==0) {
          for (let item in data) {
            options.push({"value": data[item].u_name, "data": data[item]})
          }
        }
        else {
          options.push({"value": "暂无数据", "data": "暂无数据"})
        }
        cb(options)
      })

    }
},
  beforeUnmount() {
    let para = {'selected': this.selected, 'passengers': this.passengers,'date':this.date}
    this.$emit('callback', para)
  },
  created() {
  }
}
</script>

<style scoped>

</style>