<template>
  <el-container>
    <el-main>
      <el-menu
        class="el-menu-vertical-demo"
        router
        active-text-color="#ffd04b"
        default-active="2"
      >
        <el-menu-item index="/main">
          <i class="el-icon-location" />首页
        </el-menu-item>
        <el-menu-item index="/order">
          <i class="el-icon-tickets" />购票
        </el-menu-item>
        <el-menu-item index="/timetable">
          时刻表
        </el-menu-item>
        <el-menu-item
          index="/statistic"
          :v-if="role===1"
        >
          数据统计
        </el-menu-item>
      </el-menu>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "MainAside",
  data(){
    return {
      role: 0
    }
  },
  mounted() {
    this.role = this.$store.state.role
  }
}
</script>

<style scoped>
.el-menu-item{
  background-color: #2b2b2b;
  color: white;
  justify-content: left;
}
.el-menu{
  border: 0;
}
</style>