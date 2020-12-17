const Facade = require('../../lib/facade')
const sectionSchema = require('./schema')

class SectionFacade extends Facade {
    constructor(...args) {
        super(...args)
    }
   
}

module.exports = new SectionFacade('Section', sectionSchema)
