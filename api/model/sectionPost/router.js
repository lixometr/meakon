const controller = require('./controller')
const Router = require('../../lib/router')
const router = new Router(controller)

module.exports = router.getRouter()
