import Vue from 'vue'
import Router from 'vue-router'
import api from "@/plugins/api"
// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

const Login = () => import('@/views/pages/Login')
const SignUp = () => import('@/views/pages/SignUp')








import widget from "./widget"
import product from "./product"
import category from './category'
import page from './page'
import pageStatic from './pageStatic'
import blogPost from './blogPost'
import region from './region'
import postTag from './postTag'
// import pages from './page'
import label from "./label"
import attribute from './attribute'
import promocode from './promocode'
import user from './user'
import order from './order'
import noty from './noty'
import pageTemplate from './pageTemplate'
import section from './section'
import settings from './settings'

Vue.use(Router)
const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

router.beforeEach(async (to, from, next) => {
  try {
    if (to.name === 'Login' || to.name === 'SignUp') return next()
    if (to.name === 'Login') return next()
    const { data: result } = await api.get('adminCheck')
    if (result.ok) {

      next()
    } else {
      next('/login')

    }
  } catch (err) {
    next('/login')
  }
})

export default router

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/products',
      name: 'Home',
      component: TheContainer,

      children: [
        widget,
        product,
        category,
        page,
        blogPost,
        region,
        postTag,
        // pages,
        label,
        attribute,
        promocode,
        user,
        order,
        noty,
        pageStatic,
        pageTemplate,
        section,
        settings,
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },

      ]
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

  ]
}

