
import api from "./api"

export default {
    install(Vue, store) {
        Vue.prototype.$api = api
    }
}