import ProductRoutes from "./routes/product"
import CategoryRoutes from "./routes/category"

import RegionRoutes from "./routes/region"

import PageRoutes from "./routes/page"
import UserRoutes from "./routes/user"
import PromocodeRoutes from "./routes/promocode"
import BlogPostsRoutes from "./routes/blogPost"
import SectionTagRoutes from "./routes/sectionTag"
import AttributeRoutes from "./routes/attribute"
import AttributeValuesRoutes from "./routes/attributeValues"
import LabelRoutes from "./routes/label"
import OrderRoutes from "./routes/order"
import NotyRoutes from "./routes/noty"
import FormRoutes from "./routes/form"
import PageTemplateRoutes from "./routes/pageTemplate"
import SectionRoutes from "./routes/section"
import SettingsRoutes from "./routes/settings"
import SectionPostRoutes from "./routes/sectionPost"

const routes = {
    ...ProductRoutes,
    ...CategoryRoutes,
    ...RegionRoutes,
    ...PageRoutes,
    ...UserRoutes,
    ...PromocodeRoutes,
    ...BlogPostsRoutes,
    ...SectionTagRoutes,
    ...AttributeRoutes,
    ...AttributeValuesRoutes,
    ...LabelRoutes,
    ...OrderRoutes,
    ...NotyRoutes,
    ...FormRoutes,
    ...PageTemplateRoutes,
    ...SectionRoutes,
    ...SettingsRoutes,
    ...SectionPostRoutes,
    widgetByName: '/widget/{{name}}',
    widgetByNameAdmin: '/widget/admin/{{name}}',


    login: '/auth/login',
    signup: '/auth/signup',
    confirm: '/auth/confirm/{{key}}',
    restorePassword: '/auth/restore',
    resetPassword: '/auth/reset/{{key}}',
    adminLogin: '/auth-admin/login',
    adminSignup: '/auth-admin/signup',
    adminCheck: '/auth-admin/check',

    uploadImage: '/upload/image',
    uploadFile: '/upload/file',
    search: '/search/{{text}}'

}
export default ({ version, baseUrl = '/api' } = {}) => {
    const Routes = { ...routes }
    for (let key in routes) {
        if (version) {
            Routes[key] = `${baseUrl}${version}${Routes[key]}`
        } else {
            Routes[key] = `${baseUrl}${Routes[key]}`
        }
    }
    return Routes
}