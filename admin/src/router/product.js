const Product = () => import("@/views/product/product")
const Products = () => import("@/views/product/products")

export default {
    path: "products",
    meta: {
      label: 'Products'
    },
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        path: '',
        component: Products,
        name: "Products"
      },
      {
        path: "new",
        name: "ProductNew",
        component: Product,
        props: {
          isNew: true
        }
      },
      {
        path: ":id",
        name: "Product",
        component: Product,
      },
    ]
  }