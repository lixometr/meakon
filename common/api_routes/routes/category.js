export default {
    categories: '/category',
    category: '/category/{{slug}}',
    categoriesSearch: '/category/search/{{text}}',


    categoryProducts: '/category/{{slug}}/products',
    categoryById: '/category/id/{{id}}',
    categoryAdmin: '/category/admin/{{slug}}',
    categoryByIdAdmin: '/category/admin/id/{{id}}',

    categoryChildren: '/category/{{slug}}/children',
    categoryChildrenAll: '/category/{{slug}}/children-all',
    categoryParents: '/category/{{slug}}/parents',
    categoriesPrimary: '/category/primary',
    categoryHasDateProducts: '/category/{{slug}}/has-date-products'
}