<template>
  <div
    class="login"
  >
    <el-row style="height: 100%">
      <el-col :span="12" />
      <el-col
        :span="6"
        :offset="2"
      >
        <el-tabs
          type="border-card"
          style="margin-top: 50%; height: 50%"
        >
          <el-tab-pane label="登录">
            <el-row>
              <el-col
                :span="18"
                :offset="3"
              >
                <el-input
                  prefix-icon="el-icon-user"
                  v-model="name"
                  placeholder="username"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="18"
                :offset="3"
              >
                <el-input
                  prefix-icon="el-icon-lock"
                  v-model="pass"
                  show-password
                  placeholder="password"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="4"
                :offset="10"
              >
                <el-button @click="go">
                  登录
                </el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="注册">
            <el-row>
              <el-col
                :span="18"
                :offset="3"
              >
                <el-input
                  v-model="regname"
                  placeholder="username"
                  prefix-icon="el-icon-user"
                  @change="checkUsername"
                />
              </el-col>
            </el-row>
            <el-alert
              title="用户名已存在，请重新输入或直接登录"
              type="error"
              show-icon
              :closable="false"
              v-if="duped"
            />
            <el-row>
              <el-col
                :span="18"
                :offset="3"
              >
                <el-input
                  v-model="regpass"
                  placeholder="password"
                  prefix-icon="el-icon-lock"
                  show-password
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col
                :span="4"
                :offset="10"
              >
                <el-button
                  @click="reg"
                  :disabled="valid"
                >
                  注册
                </el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import {pwdHash} from '../utils/utils'

const electron=require('electron')
// import {ElMessage} from 'element-plus'
export default {
  name: "LoginPage",
  data(){
    return {
      name: '',
      pass: '',
      regname:'',
      regpass:'',
      im: require('../assets/logo.png'),
      valid: true,
      duped: false
    }
  },
  watch: {
    regpass: function (){
      if (this.regpass!=="" && this.duped===false){
        this.valid=false
      }
    }
  },
  methods: {
    go(){
      console.log({'user':this.name})
      let params={
          'username': this.name,
          'password': pwdHash(this.pass)
      }
      console.log(params)
      this.$api.ParamInterface.login(params)
      .then(res => {
        let data = res.data
        if (data.error_num===300){
          ElMessage.success({
            message: '登陆成功',
            type: 'success'
          })
          this.$store.commit('updateFlag', data.flag)
          localStorage.setItem('username', this.name)
          localStorage.setItem('token', data.token)
          // this.$store.commit('updateToken', data.token)
          // this.$store.commit('updateUser', this.name)
          let window=electron.remote.getCurrentWindow()
          window.maximize()
          this.$router.push("/home")
        }
        else if(data.error_num===301){
          ElMessage.error({
            message:'failed',
          })
        }
      })
      //     let window=electron.remote.getCurrentWindow()
      //     window.maximize()
      // this.$router.push('/home')
    },
    checkUsername(){
      console.log(this.regname)
      if (this.regname!==""){
        let param = {'username': this.regname}
        this.$api.ParamInterface.checkUsername(param)
        .then(res=>{
          let data =res.data
          this.duped = data.error_num !== 300;
        })
      }
      else {
        this.duped=false
      }

    },
    reg(){
      let param = {'username': this.regname, 'password': pwdHash(this.regpass)}
      this.$api.ParamInterface.register(param)
      .then(res=>{
        let data = res.data
        if (data.error_num===300){
          ElMessage.success({
            message:'succeed'
          })
        }
      })
      }
    }
  }

</script>

<style scoped>
.el-row{
  margin-bottom: 20px;
}
.login{
  height: 100%;
  background-color: #2b2b2b;
  background-image: url("../assets/11.jpg");
}
</style>