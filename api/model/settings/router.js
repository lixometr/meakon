const controller = require('./controller')
const isAuthAdmin = require('../../middleware/isAuthAdmin')
const Router = require('../../lib/router')
const router = new Router(controller, {
  routes: {
    '/:name': {
      get: {
        func: 'findByName'
      },
      put: {
        middleware: [isAuthAdmin],
        func: 'updateByName'
      }
    }
  }
})




module.exports = router.getRouter()
