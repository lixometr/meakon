const BlogPosts = () => import("@/views/blogPost/blogPosts")
const BlogPost = () => import("@/views/blogPost/blogPost")

export default {
    path: "blog-posts",
    meta: {
      label: 'BlogPosts'
    },
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        name: "BlogPosts",
        component: BlogPosts,
        path: '',
      },
      {
        name: "BlogPostNew",
        path: "new",
        component: BlogPost,
        props: {
          isNew: true
        }
      },
      {
        name: "BlogPost",
        path: ":id",
        component: BlogPost,
      },
    ]
  }