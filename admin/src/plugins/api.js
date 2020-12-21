import Api from "@/../../common/api_routes/api";
import ApiRoutes from "@/../../common/api_routes/api_routes";
import store from "@/store/store";
import axios from "axios";
const instance = axios.create()
instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.getters['user/token']}`
    return config
}
);
let globalConfig = require('../../../common/config/config.development')
if (process.env.NODE_ENV === 'production') {
    globalConfig = require('../../../common/config/config.production')
}
const baseUrl = globalConfig.api.baseUrl
console.log('hey', process.env.NODE_ENV)
export default new Api(ApiRoutes({ baseUrl }), instance)