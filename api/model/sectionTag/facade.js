const Facade = require('../../lib/facade')
const sectionTagSchema = require('./schema')

class SectionTagFacade extends Facade {
    constructor(...args) {
        super(...args)
    }
}

module.exports = new SectionTagFacade('SectionTag', sectionTagSchema)
