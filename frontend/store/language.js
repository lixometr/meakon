export const state = () => ({
    // slug language
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
    language: ''
})

export const getters = {
   
    activeLanguage(state) {
        return state.languages.find(reg => reg.slug === state.language) || {}
    },
    language(state) {
        return state.language
    },
    languages(state) {
        return state.languages
    }
}
export const mutations = {
    setLanguage(state, language) {
        state.language = language
        this.$cookies.set('language', language, {
            path: '/',
            maxAge: 60 * 60 * 24 * 360

        })
    },
    setLanguages(state, languages) {
        state.languages = languages
    },
    initLanguage(state) {

    },
    
    changeLanguage(state, slug) {
        state.language = slug
        
    }
}

export const actions = {
    async init({ commit }, { country } = {}) {
        try {
            // const languages = await this.$api.$get('languages', null, null)
            // commit('setLanguages', languages)
            commit('initLanguage')
        } catch (err) {
            this.$error(err)
        }
    },
    async initLanguage({ commit, state }, language) {
        try {
            // console.log('here initing', language, country)
            if (state.language) return
            const urlLanguage = language
            // Если есть в url ставим из url
            if (urlLanguage) {
                if (this.getters['language/languages'].findIndex(reg => reg.slug === urlLanguage) >= 0) {
                    commit('setLanguage', urlLanguage)
                    return
                }
            }
            const cookieLanguage = this.$cookies.get('language')
            // Если есть в куки ставим из куков
            if (cookieLanguage) {
                if (this.getters['language/languages'].findIndex(reg => reg.slug === cookieLanguage) >= 0) {
                    commit('setLanguage', cookieLanguage)

                    return
                }
            }
            

            // const defaultLanguageId = this.getters['settings/item']('language')
            // const defaultLanguage = this.getters['language/languages'].find(reg => reg._id === defaultLanguageId) || {}
            commit('setLanguage', 'ru')

            // commit('initLanguage')
        } catch (err) {
            this.$error(err)
        }
    },
    setLanguage({ commit }, id) {
        commit('setLanguage', id)
        // this.$router.push(this.$languagePath(this.$router))
    },
    changeLanguage({commit}, slug) {
        commit('changeLanguage', slug)
    }
}