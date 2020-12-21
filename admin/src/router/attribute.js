const Attribute = () => import("@/views/attribute/attribute")
const Attributes = () => import("@/views/attribute/attributes")

export default {
    path: "attributes",
    meta: {
        label: 'Attributes'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '',
            component: Attributes,
            name: "Attributes",

        },
        {
            name: "AttributeNew",
            path: "new",
            component: Attribute,
            props: {
                isNew: true
            }
        },
        {
            name: "Attribute",
            path: ":id",
            component: Attribute,
        },
    ]
}