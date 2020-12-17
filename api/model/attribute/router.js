const controller = require('./controller')
const Router = require('../../lib/router')
const router = new Router(controller, {
  routes: {
    '/:slug/values': {
      get: {
        func: 'findValuesBySlug'
      }
    },
    '/id/:id/values': {
      get: {
        func: 'findValuesById'
      }
    }
  }
})

module.exports = router.getRouter()
