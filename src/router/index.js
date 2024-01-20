import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import Prodetail from '@/views/prodetail'
import Pay from '@/views/pay'
import Myorder from '@/views/myorder'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/searchlist',
    component: SearchList
  },
  // 动态路由传参
  {
    path: '/prodetail/:id',
    component: Prodetail
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/myorder',
    component: Myorder
  }
  ]
})

export default router
