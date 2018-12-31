import Vue from 'vue'
import VueRouter from 'vue-router'

const contentRouter = [
  // 重定向首页
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: () => import(/* webpackChunkName: "index" */ '@/view/home/index.vue')
  },
  {
    path: '/member',
    component: () => import(/* webpackChunkName: "index" */ '@/view/member/index.vue')
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "index" */ '@/view/login/index.vue')
  },
  // 所有错误的页面跳转到首页
  {
    path: '*',
    redirect: '/'
  }
]

/**
 * 要告诉 vue 使用 vueRouter
 */
Vue.use(VueRouter)

/**
 * mode: 'history' 去掉路由#
 * linkActiveClass 当前路由加上类名
 */
let router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'on',
  routes: contentRouter
})
export default router
