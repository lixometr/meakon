const Notys = () => import("@/views/noty/notys")
const Noty = () => import("@/views/noty/noty")

export default {
  path: "notys",
  meta: {
    label: 'Notys'
  },
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      name: "Notys",
      component: Notys,
      path: '',
    },
    {
      name: "NotyNew",
      path: "new",
      component: Noty,
      props: {
        isNew: true
      }
    },
    {
      name: "Noty",
      path: ":id",
      component: Noty,
    },
  ]
}