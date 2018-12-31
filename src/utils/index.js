/**
 * @Author: hopkinson
 * @Date:   2018-07-15T22:54:05+08:00
 * @Last modified by:   hopkinson
 * @Last modified time: 2018-08-13T13:52:25+08:00
 */
// 将数字转换成金额显示
export const toMoney = num => {
  num = num.toFixed(2)
  num = parseFloat(num)
  num = num.toLocaleString()
  return num
}
// 对象按字母升序排序
export const objKeySort = obj => {
  var newkey = Object.keys(obj).sort()
  var newObj = {}
  for (var i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]]
  }
  return newObj
}
// 分类
export const sortOut = ($arr, key) => {
  let result = $arr.reduce((prev, item) => {
    prev[item[key]]
      ? prev[item[key]].push(item)
      : prev[item[key]] = [item]
    return prev
  }, {})
  return result
}
export const getConstByEnv = obj => {
  const isProduction = process.env.ENV === 'prod'
  return isProduction
    ? obj['production']
    : obj['test']
}
// 数组去重
export const unique = (a) => [...new Set(a)]
// 深拷贝
export const deepcopy = (source) => {
  if (!source) {
    return source
  }
  let sourceCopy = source instanceof Array
    ? []
    : {}
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object'
      ? deepcopy(source[item])
      : source[item]
  }
  return sourceCopy
}
/**
 * add by lty
 * @2018/07/11
 *
 * 输入时间戳，输出时间格式，参数的意义
 * @param timestamp (Number) - 时间戳
 * @param human (Boolean) -显示刚刚，多少分钟前，多少小时前（true显示 false不显示）
 * @param time (Boolean) - 小时，分显示（true显示 false不显示）
 * @param second (Boolean) -秒（true显示 false不显示）

 */
export const formatDate = (timestamp, human, time, second) => {
  if (isNaN(timestamp)) {
    return timestamp
  }
  var i = String(timestamp).length // 转化为字符串
  if (i <= 10) {
    timestamp = timestamp * 1000
    return timestamp
  }
  var _string = ''
  var now = ''
  var t = new Date()
  var d = new Date((timestamp - 60 * t.getTimezoneOffset()))
  _string = d.getFullYear() + '-' + pd(d.getMonth() + 1) + '-' + pd(d.getDate())
  now = t.getFullYear() + '-' + pd(t.getMonth() + 1) + '-' + pd(t.getDate())
  var h = d.getHours()
  var m = d.getMinutes()
  var s = d.getSeconds()
  var hNow = t.getHours()
  var mNow = t.getMinutes()
  if (human && now === _string) {
    if (h > hNow) {
      _string = '刚刚'
    } else if (h === hNow) {
      if (m >= mNow) {
        _string = '刚刚'
      } else {
        _string = (mNow - m) + '分钟前'
      }
    } else {
      _string = (hNow - h) + '小时前'
    }
  } else if (time) {
    _string += ' ' + pd(h) + ':' + pd(m) + (
      second ? ':' + pd(s) : '')
  } else {
    if (now === _string) {
      _string = pd(h) + ':' + pd(m) + (
        second ? ':' + pd(s) : '')
    }
  }
  function pd (s) {
    return s < 10
      ? '0' + s
      : s
  }

  return _string
}

/**
 * 倒计时方法 chl  20181025
 * @param time
 * 使用方法
 * import {countDown} from '@/utils'
 * setInterval(function(){
 *   parameter =  countTime(time)
 *  },1000);
 */

export const countTime = (time) => {
  let date = new Date()
  let now = date.getTime()
  // 设置截止时间
  let endDate = new Date(time.replace(/-/g, '/'))
  let end = endDate.getTime()
  // 时间差
  let leftTime = Number(end - now)
  // 定义变量 h,m,s保存倒计时的时间
  let d, h, m, s

  if (leftTime > 0) {
    d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
    h = Math.floor(leftTime / 1000 / 60 / 60 % 24) // 有天数就需要%24，没有就不需要
    m = Math.floor(leftTime / 1000 / 60 % 60)
    s = Math.floor(leftTime / 1000 % 60)
  } else {
    return '00天00时00分00秒'
  }
  // 小于10的前面加0
  if (h < 10 || m < 10 || s < 10) {
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
  }
  return d + '天' + h + '时' + m + '分' + s + '秒'
}

/**
 * 倒计时方法 chl  20181025
 * @param time 传时间戳
 * 使用方法
 * import {countDown} from '@/utils'
 * setInterval(function(){
 *   parameter =  countTime2(time)
 *  },1000);
 */
export const countTime2 = (time) => {
  let date = new Date()
  let now = date.getTime()
  // 设置截止时间
  let end = time
  // 时间差
  let leftTime = Number(end - now)
  // 定义变量 h,m,s保存倒计时的时间
  let h, m, s

  if (leftTime > 0) {
    h = Math.floor(leftTime / 1000 / 60 / 60) // 有天数就需要%24，没有就不需要
    m = Math.floor(leftTime / 1000 / 60 % 60)
    s = Math.floor(leftTime / 1000 % 60)
  } else {
    return {
      hour: '00',
      minute: '00',
      second: '00'
    }
  }
  // 小于10的前面加0
  if (h < 10 || m < 10 || s < 10) {
    h = h < 10 ? '0' + h : h
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
  }
  return {
    hour: h,
    minute: m,
    second: s
  }
}
