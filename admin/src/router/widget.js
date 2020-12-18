const Widgets = () => import("@/views/widget/widgets")
const Widget = () => import("@/views/widget/widget")
const WidgetFooter = () => import("@/views/widget/footer")

const WidgetHeader = () => import("@/views/widget/header")

export default {
    path: "widgets",
    meta: {
        label: 'Widgets'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            name: "Widgets",
            component: Widgets,
            path: '',
        },


       
    
        {
            path: "footer",
            component: Widget,
            children: [
                {
                    name: "WidgetFooter",
                    path: "",
                    component: WidgetFooter,
                },
            ]
        },
        {
            path: "header",
            component: Widget,
            children: [
                {
                    name: "WidgetHeader",
                    path: "",
                    component: WidgetHeader,
                },
            ]
        },
       
        
    ]
}