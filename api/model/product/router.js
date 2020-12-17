const controller = require('./controller')
const Router = require('../../lib/router')
const router = new Router(controller, {
  routes: {
    '/search/:text': {
      get: {
        middleware: [null],
        func: 'search'
      }
    },
    '/search': {
      get: {
        middleware: [null],
        func: 'search'

      }
    },
    '/bestsellers': {
      get: {
        func: 'getBestSellers'
      }
    },
    '/hotoffers': {
      get: {
        func: 'getHotOffers'
      }
    },
    '/date/:date': {
      get: {
        func: 'findByDate'
      }
    },
    '/:slug/similar-products': {
      get: {
        func: 'getSimilarProductsBySlug'
      }
    },
    '/:slug/similar-categories': {
      get: {
        func: 'getSimilarCategoriesBySlug'
      }
    }
  }
})




// router.get('/:slug/categories', (...args) => controller.getCategories(...args))



module.exports = router.getRouter()
