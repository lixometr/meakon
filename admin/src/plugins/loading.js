class Loading {
    constructor(store) {
        this.store = store
    }
    start() {
        this.store.commit('startLoading')

    }
    stop() {
        this.store.commit('stopLoading')
    }
}
export default {
    install(Vue, store) {
        Vue.prototype.$loading = new Loading(store)
    }
}
