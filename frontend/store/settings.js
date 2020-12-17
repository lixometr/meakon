export const state = () => ({
    items: {}
})
export const getters = {
    item(state) {
        return name => state.items[name]
    },
    items(state) {
        return state.items
    }
}

export const mutations = {
    setItems(state, items) {
        state.items = items
    }
}
export const actions = {
    async init({ commit }) {
        try {
            // const region = await this.$api.$get('settingByName', { name: "region" })
            // const email = await this.$api.$get('settingByName', { name: "email" })
            // const logo = await this.$api.$get('settingByName', { name: "logo" })
            commit('setItems', {
                // region
                // phone,
                // email,
                // logo
            })
        } catch (err) {
            this.$error(err)
        }

    }
}