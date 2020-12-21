const PostTags = () => import("@/views/postTag/postTags")
const PostTag = () => import("@/views/postTag/postTag")

export default {
    path: "post-tags",
    meta: {
      label: 'PostTags'
    },
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        name: "PostTags",
        component: PostTags,
        path: '',
      },
      {
        name: "PostTagNew",
        path: "new",
        component: PostTag,
        props: {
          isNew: true
        }
      },
      {
        name: "PostTag",
        path: ":id",
        component: PostTag,
      },
    ]
  }