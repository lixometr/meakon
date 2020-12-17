const Facade = require('../../lib/facade')
const sectionPostSchema = require('./schema')

class SectionPostFacade extends Facade {
    constructor(...args) {
        super(...args)
    }
    async findSectionItems(section) {
        return await this.find({
            section
        })
    }
}

module.exports = new SectionPostFacade('SectionPost', sectionPostSchema)
