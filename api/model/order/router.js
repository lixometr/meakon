const controller = require('./controller')
const Router = require('../../lib/router')
const isAuthAdmin = require('../../middleware/isAuthAdmin')
const isAuth = require('../../middleware/isAuth')
const router = new Router(controller, {
  routes: {
    '/id/:id': {
      get: {
        middleware: [isAuthAdmin]
      }
    },
    '/orderid/:id': {
      get: {
        middleware: [isAuth],
        func: 'findByOrderId'
      }
    },
    '/id/:id/change-status': {
      put: {
        middleware: [isAuthAdmin],
        func: 'changeStatus'
      }
    },
    '/create': {
      post: {
        middleware: [isAuth],
        func: 'create'
      }
    }
  }
})





module.exports = router.getRouter()
