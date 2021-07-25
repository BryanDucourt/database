import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import LoginPage from "../views/LoginPage";
import MainPage from "../views/MainPage";
import OrderPage from "../views/OrderPage";
import TimeTablePage from "../views/TimeTablePage";
import QueryPage from "../views/QueryPage";
import LocPage from "../components/LocPage";
import CusPage from "../components/CusPage";
import PayPage from "../components/PayPage";
import ChartPage from "../views/ChartPage";

const routes = [
  {
    path: '/',
    component: LoginPage
  },
  {
    path: '/home',
    component: () => import('../views/Main'),
    children:[
      {
        path: "/main",
        component: MainPage
      },
      {
        path: "/order",
        component: OrderPage,
        children:[
          {
            path :"/location",
            component: LocPage
          },
          {
            path: "/cus",
            component: CusPage
          },
          {
            path: "/pay",
            component: PayPage
          }
        ]
      },
      {
        path: "/timetable",
        component: TimeTablePage
      },
      {
        path: "/query",
        component: QueryPage
      },
      {
        path: "/statistic",
        component: ChartPage
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
