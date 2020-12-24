import Api from "@/../../common/api_routes/api";
import ApiRoutes from "@/../../common/api_routes/api_routes";
import store from "@/store/store";
import axios from "axios";
import globalConfig from "@/helpers/globalConfig"

const instance = axios.create()
instance.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.getters['user/token']}`
    return config
}
);

const baseUrl = globalConfig.api.baseUrl
console.log('hey', process.env.NODE_ENV)
export default new Api(ApiRoutes({ baseUrl }), instance)