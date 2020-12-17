import api from "@/plugins/api"
export const namespaced = true
export const state = () => ({
    regions: []
})
export const getters = {
    regions(state) {
        return state.regions
    },
    getRegion(state) {
        return (id) => {
            return state.regions.find(reg => reg._id === id) || {}
        }
    }
}
export const mutations = {
    setRegions(state, regions) {
        state.regions = regions
    }
}
export const actions = {
    async fetch({ commit }) {
        const {data: regions} = await api.get('regions')
        commit('setRegions', regions)
    }
}