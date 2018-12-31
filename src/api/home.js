import { requestAjax } from '@/service'
import * as ajax from '@/service/ajax'

// 奢品共享首页 {needSign: true, needToken: true}
const home = ajax.axiosJSONByPost('api/shareStock/getSpList', {needSign: true})
export const axiosHome = requestAjax(home)
// 轮播
const releaseItem = ajax.axiosJSONByGet('api/shareShop/getByType', {needSign: true})
export const axiosReleaseItem = requestAjax(releaseItem)
// 手机获取登陆验证码
const useCode = ajax.axiosJSONByGet('api/member/getValidateCode', {needSign: true})
export const axiosUseCode = requestAjax(useCode)
// 登陆
const useLogin = ajax.axiosJSONByPost('api/member/loginByPhone', {needSign: true})
export const axiosUseLogin = requestAjax(useLogin)
// 获取个人中心信息
const memberInfo = ajax.axiosJSONByGet('api/shareStock/getMyInfoAll', {needSign: true, needToken: true})
export const axiosMemberInfo = requestAjax(memberInfo)
