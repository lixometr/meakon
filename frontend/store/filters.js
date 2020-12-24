export const state = () => ({
    // { price: [], attributes: [ attrId, attrId, attrId ] }
    items: {},
    // {price: [start, end], attributes: { 'attr-slug': ['attr-value-slug'] }}
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
    activeAttributes(state, getters) {
        return getters.active.attributes || {}
    },
    activePrice(state, getters) {
        return getters.active.price || []
    },
    price(state, getters) {
        return getters.items.price || []
    },
    
    objFilters(state, getters) {
        const price = getters.activePrice
        const activeAttributes = getters.activeAttributes
        const attributes = getters.attributes
        // return activeAttributes
        const allAttributes = Object.keys(activeAttributes).map(attrId => {
            const attrValues = activeAttributes[attrId] || []
            const allAttr = attributes.find(attr => attr.name._id === attrId)
            const value = allAttr.value.filter(attrValue => attrValues.includes(attrValue._id))
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
        state.active = newValue
    },
    setPrice(state, price) {
        state.active = { ...state.active, price }
    },
    setItems(state, items) {
        state.items = items
    },
    setAttributesFromSlug(state, items) {

    },
    init(state, query) {
        const active = { ...query }
        delete active.page
        let price = []
        if (active.price) {
            price = active.price.split(',')
        }
        delete active.price
        this.commit('filters/setPrice', price)
        Object.keys(active).map(attrSlug => {
            let value = active[attrSlug] || ''
            if(!value) return
            value = value.split(',').filter(item => !!item)
            this.commit('filters/changeAttr', {name: attrSlug, value})
        })


    },
    clear(state) {
        const newValue = {}
        newValue.price = [...state.items.price]
        state.active = newValue
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