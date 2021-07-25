<template>
  <el-container style="height: 100%">
    <el-header>
      <Header />
    </el-header>
    <el-container>
      <el-aside
        width="10%"
        style="height: auto;background-color: #2b2b2b"
      >
        <main_aside />
      </el-aside>
      <el-main style="height: 100%;background: white;padding: 0">
        <router-view @callback="handleCallback" />
      </el-main>
    </el-container>
    <el-dialog
      title="Warning"
      v-model="dialogVisible"
    >
      <span>请完善个人信息以使用系统</span>
      <template #footer>
        <el-row>
          <el-col
            :span="18"
            :offset="3"
          >
            <el-input
              v-model="name"
              placeholder="name"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="18"
            :offset="3"
          >
            <el-input
              v-model="identity"
              placeholder="identity"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="18"
            :offset="3"
          >
            <el-input
              v-model="phone"
              placeholder="phone"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col
            :span="18"
            :offset="3"
          >
            <el-button
              type="primary"
              @click="updateUserDetail"
            />
          </el-col>
        </el-row>
      </template>
    </el-dialog>
  </el-container>
</template>

<script>
import Header from "../components/Header.vue";
import main_aside from "../components/main_aside";
import {ElMessage} from "element-plus";
export default {
  name: "Main",
  components:{
    Header,
    main_aside
  },
  mounted() {
    this.$router.push("/main");
    if (this.$store.state.flag===0){
      this.dialogVisible= true
    }
  },
  data(){
    return {
      identity: "",
      name:"",
      phone: "",
      dialogVisible: false
    }
    
  },
  methods: {
    updateUserDetail(){
      let data = {
        'data': {
          'identity': this.identity,
          'name': this.name,
          'phone': this.phone
        }
      }
      this.$api.ParamInterface.updateUserDetail(data)
      .then(res=>{
        let data = res.data
        if( data.error_num===300){
          this.dialogVisible=false
        }
        else {
          ElMessage.error({
            message: data.msg
          })
        }
      })
    },
    handleCallback(param){
      this.$router.push(param)
    }
  }
}
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
.el-header{
  padding: 0;
}
</style>