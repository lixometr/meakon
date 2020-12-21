const Users = () => import("@/views/user/users")
const User = () => import("@/views/user/user")


export default {
    path: "users",
    meta: {
      label: 'Users'
    },
    component: {
      render(c) { return c('router-view') }
    },
    children: [
      {
        name: "Users",
        component: Users,
        path: '',
      },
      {
        name: "UserNew",
        path: "new",
        component: User,
        props: {
          isNew: true
        }
      },
      {
        name: "User",
        path: ":id",
        component: User,
      },
    ]
  }