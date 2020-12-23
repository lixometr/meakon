export const state = () => ({
    // [ attrId, attrId, attrId ] 
    items: {},
    // {price: [start, end], attributes: { attrId: [attrValueId] }}
    active: {}
})

export const getters = {
    items(state) {
        return state.items || {}
    },
    active(state) {
        return state.active
    },
    attributes(state, getters) {
        return getters.items.attributes || []
    },
    activeAttributes() {
        return getters.active.attributes || {}
    },
    activePrice() {
        return getters.active.price || []
    },
    price(state, getters) {
        return getters.items.price || []
    },
    slugFilters(state, getters) {
        return getters.objFilters.attributes.map(attr => {
            const value = attr.value.map(attrVal => attrVal.slug)
            return {
                name: attr.name.slug,
                value
            }
        })
    },
    objFilters(state, getters) {
        const price = getters.activePrice
        const activeAttributes = getters.activeAttributes
        const attributes = getters.attributes
        // return activeAttributes
        const allAttributes = Object.keys(activeAttributes).map(attrId => {
            const attrValues = activeAttributes[attrId]
            const allAttr = attributes.find(attr => attr.name._id === attrId)
            const value = allAttr.value.filter(attrValue => attrValues.inludes(attrValue._id))
            return {
                name: allAttr.name,
                value
            }
        })

        return {
            price,
            attributes: allAttributes
        }
    }
}
export const mutations = {
    changeAttr(state, { name, value }) {
        const newValue = Object.assign({}, { ...state.active })
        newValue.attributes = Object.assign({}, { ...newValue.attributes }, { [name]: value })
        console.log('see', name, value)
        state.active = newValue
    },
    setPrice(state, price) {
        state.active = { ...state.active, price }
    },
    setItems(state, items) {
        state.items = items
    },
    init(state, { items }) {
        this.commit('filters/setItems', items)
        let price = items.price
        this.commit('filters/setPrice', price)
    },
    clear(state) {
        state.active = {}
    }
}
export const actions = {
    clear({ commit }) {
        commit('clear')
    },
    init({ commit }, payload) {
        commit('init', payload)
    }
}