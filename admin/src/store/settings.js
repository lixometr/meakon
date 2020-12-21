import api from "@/plugins/api"
export const namespaced = true
export const state = () => ({
    settings: []
})
export const getters = {
    settings(state) {
        return state.settings
    },
    getSetting(state) {
        return (id) => {
            return state.settings.find(reg => reg._id === id) || {}
        }
    }
}
export const mutations = {
    setSettings(state, settings) {
        state.settings = settings
    }
}
export const actions = {
    async fetch({ commit }) {
        try {
            const { data: settings } = await api.get('settings')
            console.log('settin', settings.items)
            commit('setSettings', settings.items)
        } catch (err) {
            console.log(err)
        }

    }
}