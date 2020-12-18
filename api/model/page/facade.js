const Facade = require('../../lib/facade')
const pageSchema = require('./schema')

class PageFacade extends Facade {
    constructor(...args) {
        super(...args)
    }
    async findBySlug(slug) {
        const item = await this.Model.findOne({ slug, is_published: true })
        return item
    }
}

module.exports = new PageFacade('Page', pageSchema)
