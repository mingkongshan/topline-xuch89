import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

const USER_KEY = 'abc'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录用户,一个对象,包含 token 信息
    user: getItem('user')
    // null  {token, refresh_token }
    // user: null // 当前登录用户状态 (token)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失 state 中的 user 状态，我们把它放到本地存储
      setItem('user', state.user)
    }
  },

  actions: {
  },

  modules: {
  }

})
