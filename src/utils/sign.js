import VueCookies from 'vue-cookies'
import {SecretKey} from '@/const'
import qs from 'qs'
import {objKeySort} from '@/utils'
import MD5 from '@/utils/md5'
const isProduction = process.env.NODE_ENV === 'production'
let secret = isProduction ? SecretKey.production : SecretKey.test

let CommonData = () => {
  return {
    time: Math.floor(Date.now() / 1000), // 时间戳
    rcode: Math.floor(Math.random() * 9999) // 随机4位数
  }
}
/**
 * Post请求验签
 * @param url
 * @param body
 * @returns {string}
 * @constructor
 */
export const Post = (url, body, target) => {
  let needToken = target.needToken && VueCookies.get('wbiao.memberservice.tokenid') ? {
    'wb-token': VueCookies.get('wbiao.memberservice.tokenid')
  } : {}
  let commonData = CommonData()
  let sortObject = Object.assign({}, commonData, needToken, {}, {
    body: JSON.stringify(body)
  })
  let signObject = objKeySort(sortObject)
  let signParams = `${qs.stringify(signObject, {encode: false})}${secret}`
  commonData.sign = MD5(signParams)
  return url + '?' + qs.stringify(commonData)
}

/**
 * Get请求验签
 * @param url
 * @param body
 * @returns {string}
 * @constructor
 */
export const Get = (url, body, target) => {
  let needToken = target.needToken && VueCookies.get('wbiao.memberservice.tokenid') ? {
    'wb-token': VueCookies.get('wbiao.memberservice.tokenid')
  } : {}
  let commonData = CommonData()
  let sortObject = Object.assign({}, commonData, needToken, body)
  let signObject = objKeySort(sortObject)
  let signParams = `${qs.stringify(signObject, {encode: false})}${secret}`
  commonData.sign = MD5(signParams)
  if (url.indexOf('?') > 0) {
    return url + '&' + qs.stringify(commonData)
  } else {
    return url + '?' + qs.stringify(commonData)
  }
}
