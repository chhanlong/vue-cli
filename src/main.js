import Vue from 'vue'
import app from './App'
import router from './router'
import store from '@/store'
import $http from '@/api'
import {OSS, Domain} from '@/const'
import {getConstByEnv} from '@/utils'
// 组件
import '@/components/global'
// 全局样式加载
import '@/assets/css/common.css'
import '@/assets/css/sprite.css'
/**
 * UI框架
 */
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

Vue.prototype.$store = store
Vue.prototype.$http = $http
// 定义全局变量名称 $imgUrl 图片前缀
Vue.prototype.$imgUrl = getConstByEnv(OSS)
// 定义全局变量名称 $Domain 域名前缀
Vue.prototype.$Domain = getConstByEnv(Domain)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { app },
  template: '<app />'
})
