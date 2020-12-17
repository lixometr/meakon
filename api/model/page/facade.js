const Facade = require('../../lib/facade')
const pageSchema = require('./schema')

class PageFacade extends Facade {
    constructor(...args) {
        super(...args)
    }
}

module.exports = new PageFacade('Page', pageSchema)
