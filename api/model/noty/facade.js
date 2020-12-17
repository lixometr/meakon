const Facade = require('../../lib/facade')
const notySchema = require('./schema')

class NotyFacade extends Facade {
    constructor(...args) {
        super(...args)
    }

}

module.exports = new NotyFacade('Noty', notySchema)
