<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  beforeCreate() {
    localStorage.setItem('token','')
    localStorage.setItem('username', '')
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  width: 100%;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  color: #2c3e50;
}
</style>
