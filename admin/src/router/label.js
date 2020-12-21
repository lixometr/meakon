
const Labels = () => import("@/views/label/labels")
const Label = () => import("@/views/label/label")
export default {
    path: "labels",
    meta: {
        label: 'Labels'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '',
            component: Labels,
            name: "Labels",

        },
        {
            name: "LabelNew",
            path: "new",
            component: Label,
            props: {
                isNew: true
            }
        },
        {
            name: "Label",
            path: ":id",
            component: Label,
        },
    ]
}