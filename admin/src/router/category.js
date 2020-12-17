const Category = () => import("@/views/category/category")
const Categories = () => import("@/views/category/categories")

export default {
    path: "categories",
    meta: {
        label: 'Categories'
    },
    component: {
        render(c) { return c('router-view') }
    },
    children: [
        {
            path: '',
            name: "Categories",
            component: Categories,
        },
        {
            name: "CategoryNew",
            path: "new",
            component: Category,
            props: {
                isNew: true
            }
        },
        {
            name: "Category",
            path: ":id",
            component: Category,
        },
    ]
}