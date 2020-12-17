const PageTemplates = () => import("@/views/pageTemplate/pageTemplates")
const PageTemplate = () => import("@/views/pageTemplate/pageTemplate")

export default {
    path: "page-templates",
    meta: {
      label: 'PageTemplates'
    },
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        name: "PageTemplates",
        component: PageTemplates,
        path: '',
      },
      {
        name: "PageTemplateNew",
        path: "new",
        component: PageTemplate,
        props: {
          isNew: true
        }
      },
      {
        name: "PageTemplate",
        path: ":id",
        component: PageTemplate,
      },
    ]
  }