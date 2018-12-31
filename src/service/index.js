/**
 * 个请求
 * @param api
 * @param startAction
 * @param endAction
 */
import { Indicator, Toast } from 'mint-ui'
export const requestAjax = (api, startAction, endAction) => async (data, cb, reject) => {
  // 显示加载图标
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
  let resp = await api(data)
  let code = resp.status
  if (code !== 200) {
    Toast('请求网络超时')
  } else {
    // 隐藏加载框
    Indicator.close()
    let data = await resp
    // 406 时间过期,清空存储的用户信息，返回首页
    if ([406, 403].includes(Number(data.data.info.error))) {
      // wx.clearStorageSync()
      // wx.redirectTo({
      //   url: '/pages/home/home'
      // })
    } else if (Number(data.data.info.error) === 400) {
      Toast(data.data.info.message)
    } else if (Number(data.data.info.error) === 0) {
      return data
    }
  }
}
