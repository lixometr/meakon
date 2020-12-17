const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class AttributeValueModification extends Modification {

  
    async init () {
    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            slug: this.item.slug,
            attributeId: this.item.attributeId,
        }
    }
  
}