import Vue from "vue"
export const namespaced = true;
export const state = () => ({
    token: '',
    user: {}
})
export const getters = {
    token(state) {
        return state.token
    }
}

export const mutations = {
    setToken(state, token) {
        state.token = token
        Vue.cookie.set('admin_token', token, {
            expires: '1D'
        })
    },
    initToken(state) {
        state.token = Vue.cookie.get('admin_token')
    },
    setUser(state, user) {
        state.user = user
    },
    resetToken(state) {
        state.token = ''
    }
}

export const actions = {
    logout({commit}) {
        Vue.cookie.delete('admin_token')
        commit('resetToken')
    }
}