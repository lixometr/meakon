const PagesStatic = () => import("@/views/pageStatic/pages")

export default {
    path: "pages-static",
    meta: {
      label: 'Pages Static'
    },
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        name: "PagesStatic",
        component: PagesStatic,

        path: '',
      },

      
    ]
  }