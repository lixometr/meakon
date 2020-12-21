const Regions = () => import("@/views/region/regions")

export default {
  path: "regions",
  meta: {
    label: 'Regions'
  },
  component: {
    render(c) { return c('router-view') }
  },
  children: [
    {
      name: "Regions",
      component: Regions,

      path: '',
    },

  ]
}