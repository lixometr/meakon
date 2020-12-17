const Promocode = () => import("@/views/promocode/promocode")
const Promocodes = () => import("@/views/promocode/promocodes")

export default {
    path: "promocodes",
    meta: {
        label: 'Promocodes'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '',
            name: "Promocodes",
            component: Promocodes
            ,
        },
        {
            name: "PromocodeNew",
            path: "new",
            component: Promocode,
            props: {
                isNew: true
            }
        },
        {
            name: "Promocode",
            path: ":id",
            component: Promocode,
        },
    ]
}