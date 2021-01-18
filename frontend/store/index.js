import _ from "lodash"
export const state = () => ({
  isLoading: false,
  passwordLength: 4,
  showFiltersBtn: false,
  showFiltersSidebar: false

})
export const getters = {
  defaultImage() {
    return '/no_image.png'
  },  
  head(state) {
    return state.head
  },

  showFiltersBtn(state) {
    return state.showFiltersBtn
  },
  showFiltersSidebar(state) {
    return state.showFiltersSidebar
  },

  pageTitle(state) {
    return (name, type) => {
      return name
    }
  },
  currency(state, getters) {
    return 'руб.'
  },


  nuxtKey(state, getters) {
    return getters.currency + ' ' + getters.activeLanguageSlug
  },
  isLoading(state) {
    return state.isLoading
  }
}
export const mutations = {
  setFiltersSidebar(state, value) {
    state.showFiltersSidebar = value
  },
  setFiltersBtn(state, value) {
    state.showFiltersBtn = value
  },
  startLoading(state) {
    state.isLoading = true

  },
  stopLoading(state) {
    state.isLoading = false


  },
}
export const actions = {

  async nuxtServerInit({ commit, dispatch }, { app, req, i18n, route }) {
    try {
      await dispatch('settings/init')
      // await dispatch('user/init')





    } catch (err) {
      this.$error(err)
    }
  },

}