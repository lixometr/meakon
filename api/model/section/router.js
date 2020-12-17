const controller = require('./controller')
const Router = require('../../lib/router')
const sectionPostController = require('../sectionPost/controller')
const router = new Router(controller, {
    routes: {
        '/id/:id/items': {
            get: {
                func: sectionPostController.findSectionItemsById.bind(sectionPostController)
            }
        },
        '/:slug/items': {
            get: {
                func: sectionPostController.findSectionItemsBySlug.bind(sectionPostController)
            }
        }
    }
})

module.exports = router.getRouter()
