export default ({app, store})  => {
    app.languagePath = function (path) {
        const lang = store.getters['language/language']
        return `/${lang}${path}`
    }
}