export default async ({ redirect, store, req, params, route }) => {
    await store.dispatch('language/initLanguage', params.lang)

    const nowLanguage = store.getters['language/language']
    const routePath = route.fullPath
    if (routePath.indexOf(`/${nowLanguage}`) !== 0) {
        let path = `/${nowLanguage}${routePath}`
        // if (showModal) {
        //     path += '?modal=language'
        // }
        redirect(path)
    }
    return true;
}