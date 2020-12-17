const controller = require('./controller')
const Router = require('../../lib/router')
const router = new Router(controller, {
  routes: {}
})

module.exports = router.getRouter()
