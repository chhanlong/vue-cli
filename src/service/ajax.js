import VueCookies from 'vue-cookies'
import {API} from '@/const'
import axios from 'axios'
const sign = require('@/utils/sign')
// Vue.prototype.$axios = axios
const isProduction = process.env.ENV === 'prod'
axios.defaults.baseURL = isProduction ? API.production : API.test

// 获取get链接参数
let getparam = params => {
  let buffer = []
  let count = 0
  for (let name in params) {
    count++
    if (!params.hasOwnProperty(name)) {
      continue
    }
    let value = params[name]
    buffer.push(
      encodeURIComponent(name) + '=' + encodeURIComponent((value == null) ? '' : value)
    )
    let source = buffer.join('&').replace(/%20/g, '+')
    if (count === Object.keys(params).length) {
      return source
    }
  }
}

let axiosJSON = (url, params, target, methodType) => {
  let tokenID = VueCookies.get('wbiao.memberservice.tokenid')
  // 判断 如果需要登陆才需要把tokenID写入到headers进去
  if (target && target.needToken && tokenID) {
    axios.defaults.headers['wb-token'] = tokenID
  } else {
    axios.defaults.headers = {}
  }
  if (methodType === 'get') {
    url = params ? url + '?' + getparam(params) : url
    if (target) {
      url = sign.Get(url, params, target)
    }
    return axios.get(url)
  } else {
    if (target) {
      url = sign.Post(url, params, target)
    }
    return axios.post(url, params)
  }
}

// needSign needToken
export const axiosJSONByPost = (url, target) => query => axiosJSON(url, query, target, 'post')
export const axiosJSONByGet = (url, target) => query => axiosJSON(url, query, target, 'get')
