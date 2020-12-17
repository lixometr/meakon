const Facade = require('../../lib/facade')
const pageTemplateSchema = require('./schema')

class PageTemplateFacade extends Facade {
    constructor(...args) {
        super(...args)
    }

}

module.exports = new PageTemplateFacade('PageTemplate', pageTemplateSchema)
