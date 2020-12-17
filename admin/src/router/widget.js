const Widgets = () => import("@/views/widget/widgets")
const Widget = () => import("@/views/widget/widget")
const WidgetMainPage = () => import("@/views/widget/mainPage")
const WidgetFooter = () => import("@/views/widget/footer")
const WidgetFaq = () => import("@/views/widget/faq")
const WidgetAboutPage = () => import("@/views/widget/about")
const WidgetContactPage = () => import("@/views/widget/contact")
const WidgetBlogPage = () => import("@/views/widget/blog")
const WidgetHeader = () => import("@/views/widget/header")
const WidgetProductSidebar = () => import("@/views/widget/productSidebar")
const WidgetCartPage = () => import("@/views/widget/cart")
const WidgetCheckoutPage = () => import("@/views/widget/checkout")
const WidgetCalendarPage = () => import("@/views/widget/calendar")
const WidgetPrivacyPage = () => import("@/views/widget/privacy")
const WidgetTermsPage = () => import("@/views/widget/terms")
const WidgetRefundPolicy = () => import("@/views/widget/refundPolicy")
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
            path: "main_page",
            component: Widget,
            children: [
                {
                    name: "WidgetMainPage",
                    path: "",
                    component: WidgetMainPage,
                },
            ]
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
        {
            path: "product-sidebar",
            component: Widget,
            children: [
                {
                    name: "WidgetProductSidebar",
                    path: "",
                    component: WidgetProductSidebar,
                },
            ]
        },
        {
            path: "faq",
            component: Widget,
            children: [
                {
                    name: "WidgetFaq",
                    path: "",
                    component: WidgetFaq,
                },
            ]
        },
        {
            path: "refund-policy",
            component: Widget,
            children: [
                {
                    name: "WidgetRefundPolicy",
                    path: "",
                    component: WidgetRefundPolicy,
                },
            ]
        },
        {
            path: "privacy",
            component: Widget,
            children: [
                {
                    name: "WidgetPrivacyPage",
                    path: "",
                    component: WidgetPrivacyPage,
                },
            ]
        },
        {
            path: "terms",
            component: Widget,
            children: [
                {
                    name: "WidgetTermsPage",
                    path: "",
                    component: WidgetTermsPage,
                },
            ]
        },
        {
            path: "checkout",
            component: Widget,
            children: [
                {
                    name: "WidgetCheckoutPage",
                    path: "",
                    component: WidgetCheckoutPage,
                },
            ]
        },
        {
            path: "cart",
            component: Widget,
            children: [
                {
                    name: "WidgetCartPage",
                    path: "",
                    component: WidgetCartPage,
                },
            ]
        },
        {
            path: "blog",
            component: Widget,
            children: [
                {
                    name: "WidgetBlogPage",
                    path: "",
                    component: WidgetBlogPage,
                },
            ]
        },
        {
            path: "about",
            component: Widget,
            children: [
                {
                    name: "WidgetAboutPage",
                    path: "",
                    component: WidgetAboutPage,
                },
            ]
        },
        
        {
            path: "contact_page",
            component: Widget,
            children: [
                {
                    name: "WidgetContactPage",
                    path: "",
                    component: WidgetContactPage,
                },
            ]
        },
        {
            path: "calendar_page",
            component: Widget,
            children: [
                {
                    name: "WidgetCalendarPage",
                    path: "",
                    component: WidgetCalendarPage,
                },
            ]
        },
        
    ]
}