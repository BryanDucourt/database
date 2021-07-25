<template>
  <div class="header">
    <el-row
      :gutter="20"
      style="width: 100%"
    >
      <el-col :span="2">
        <el-image
          :src="logo"
          fit="scale-down"
          style="height: 30px"
        />
      </el-col>
      <el-col
        :span="2"
        :offset="20"
      >
        <el-button
          type="primary"
          @click="logOut"
          style="height: 100%"
        >
          重启
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// const remote=require('electron').remote
export default {
  name: "Header",
  data(){
    return {
      logo: require("../assets/v2-b7d9b261e55b3bbab74cc67fec7bd5fc_720w.gif")
    }
  },
  methods:{
    logOut(){
      localStorage.setItem('token', '')
      localStorage.setItem('username', '')
      this.$router.push('/')

    }
  }
}
</script>

<style scoped>
.header{
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: #2c3e50;
}

</style>