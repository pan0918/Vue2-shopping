import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import Prodetail from '@/views/prodetail'
import Pay from '@/views/pay'
import Myorder from '@/views/myorder'
import store from '@/store'

import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/category', component: Category },
      { path: '/cart', component: Cart },
      { path: '/user', component: User }
    ]
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

// 定义数组存需要权限访问的页面
const authUrls = ['/pay', '/myOrder']

// 全局前置导航守卫(官网有文档)
router.beforeEach((to, from, next) => {
  // 看to.path
  if (!authUrls.includes(to.path)) {
    next()
    return
  }

  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
