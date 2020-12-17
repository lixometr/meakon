const controller = require('./controller')
const productController = require('../product/controller')
const isAuthAdmin = require('../../middleware/isAuthAdmin')
const Router = require('../../lib/router')
const router = new Router(controller, {
  routes: {
    '/primary': {
      get: {
        func: 'getPrimaryCategories'
      }
    },
    '/*/parents': {
      get: {
        func: 'getParentList'
      }
    },
    '/*/children': {
      get: {
        func: 'getChildren'
      }
    },
    '/*/children-all': {
      get: {
        func: 'getChildrenAll'
      }
    },
    '/*/products': {
      get: {
        func: (...args) => productController.getProductsByCategorySlug(...args)
      }
    },
    '/*/filters': {
      get: {
        func: (...args) => productController.getProductFiltersByCategorySlug(...args)
      }
    },
    '/*/has-date-products': {
      get: {
        func: 'hasDateProducts'
      }
    },
    '/:slug': {
      get: {
        disabled: true,
      }

    },
    '/*': {
      get: {
        func: "findBySlug"
      }
    }
  }
})






module.exports = router.getRouter()
