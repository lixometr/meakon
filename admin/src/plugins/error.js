function errorHandler(notify) {
    return function (err) {
        console.log(err)
        console.log(this)
        if(err.status === 401) {

        }
        notify({
            group: "main",
            type: 'error',
            title: "Ошибка",
            message: err.message
        })
    }
}
export default {
    install(Vue, notify) {
        Vue.prototype.$error = errorHandler(notify)
    }
}