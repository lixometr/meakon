const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class AttributeModification extends Modification {

  
    async init() {
    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            name_en: this.item.name_en,
            slug: this.item.slug,
        }
    }

}