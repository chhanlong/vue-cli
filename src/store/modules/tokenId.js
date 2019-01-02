// 设置一个变量
const state = {
  tokenId: ''
}
// 页面通过this.$store.commit('shareHome/SET_SHARE_IMAGE','')来调用方法
const mutations = {
  SET_TOKEN_ID (state, tokenId) {
    console.log('set: ', tokenId)
    state.tokenId = tokenId
  },
  CLEAR_TOKEN_ID (state) {
    state.tokenId = ''
  }
}

// const actions = {
//   setShareImage ({commit}) {
//     commit('SET_SHARE_IMAGE')
//   },
//   getShareImage ({commit}) {
//     commit('GET_SHARE_IMAGE')
//   }
// }

// this.$store.getters['shareHome/shareImage']
// const getters = {
//   shareImage: state => state.shareImage
// }

export default {namespaced: true, state, mutations}
