import Vue from 'vue'
import Vuex from 'vuex'
let globalConfig
if (process.env.NODE_ENV === 'production') {
  globalConfig = require('../../../common/config/config.production.js')
} else {
  globalConfig = require('../../../common/config/config.development.js')
}
Vue.use(Vuex)
let frontUrl = globalConfig.frontend.baseUrl
const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  loading: false,
  frontUrl
}
const getters = {
  frontUrl(state) {
    return state.frontUrl;
  },

  isLoading(state) {
    return state.loading
  },
  horizontal() {
    return { input: "col-8", label: "col-4 text-right pr-4" }
  }
}
const mutations = {
  startLoading(state) {
    state.loading = true
  },
  stopLoading(state) {
    state.loading = false
  },
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set(state, [variable, value]) {
    state[variable] = value
  }
}

const actions = {
  async init({ commit }) {
    commit('user/initToken')
    const resolvers = [
      async () => {
        await this.dispatch('region/fetch')
      },
      async () => {
        await this.dispatch('settings/fetch')
      },

    ].map(async func => await func())
    await Promise.all(resolvers)
  }
}
import * as region from "./region"
import * as user from "./user"
import * as settings from "./settings"

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    region,
    user,
    settings
  }
})