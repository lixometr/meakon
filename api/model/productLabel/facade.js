const Facade = require('../../lib/facade')
const productLabelSchema = require('./schema')

class ProductLabelFacade extends Facade {
    constructor(...args) {
        super(...args)
    }
}

module.exports = new ProductLabelFacade('ProductLabel', productLabelSchema)
