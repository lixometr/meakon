const Pages = () => import("@/views/page/pages")
const Page = () => import("@/views/page/page")

export default {
    path: "pages",
    meta: {
      label: 'Pages'
    },
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        name: "Pages",
        component: Pages,

        path: '',
      },
      {
        name: "PageNew",
        path: "new",
        component: Page,
        props: {
          isNew: true
        }
      },
      {
        name: "Page",
        path: ":id",
        component: Page,
      },
      
    ]
  }