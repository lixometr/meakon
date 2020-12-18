export const state = () => ({
    languages: [
        {
            slug: 'ru',
            name: "Русский"
        },
        {
            slug: 'en',
            name: "Английский"
        }
    ],
    activeLanguage: 'ru'
})
export const getters = {
    activeLanguage(state) {
        return state.activeLanguage
    }
}
export const mutations = {
    setActiveLanguage(state, slug) {
        state.activeLanguage = slug
    }
}

export const actions = {

}