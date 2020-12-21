import Api from "../../common/api_routes/api"
import ApiRoutes from "../../common/api_routes/api_routes"
import globalConfig from "@/helpers/globalConfig"
export default async ({ app, $axios, store }, inject) => {
    // store.commit('user/initToken')
    $axios.interceptors.request.use(config => {
        // const token = store.getters['user/token']
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`
        // }
        config.params = Object.assign({}, {
            // region: store.getters['region/region']
        }, config.params)
        return config
    })
    let baseUrl = globalConfig.api.baseUrl

    if (process.server) {
        baseUrl = 'http://localhost:8080'
    }
    // console.log('hey', process.env.NODE_ENV)
    inject('api', new Api(ApiRoutes({ baseUrl }), $axios, {}))
}