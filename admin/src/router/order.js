const Orders = () => import("@/views/order/orders")
const Order = () => import("@/views/order/order")


export default {
    path: "orders",
    meta: {
      label: 'Orders'
    },
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        name: "Orders",
        component: Orders,
        path: '',
      },
      {
        name: "OrderNew",
        path: "new",
        component: Order,
        props: {
          isNew: true
        }
      },
      {
        name: "Order",
        path: ":id",
        component: Order,
      },
    ]
  }