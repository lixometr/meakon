import _ from "lodash"
export const state = () => ({
  isLoading: false,
  passwordLength: 4,
  showFiltersBtn: true

})
export const getters = {
  head(state) {
    return state.head
  },
 
  showFiltersBtn(state) {
    return state.showFiltersBtn
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