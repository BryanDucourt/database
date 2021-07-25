import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import store from './store'
import api from './api/interface'
import * as echarts from "echarts";

const app = createApp(App).use(store)
installElementPlus(app)
app.config.globalProperties.$api = api
app.config.globalProperties.$echarts = echarts
app.use(router).mount('#app')