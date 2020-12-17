const controller = require('./controller')
const Router = require('../../lib/router')
const router = new Router(controller, {
    routes: {
        '/name/:name': {
            get: {
                func: 'findByName'
            }
        }
    }
})


module.exports = router.getRouter()
