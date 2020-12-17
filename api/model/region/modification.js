const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class RegionModification extends Modification {

    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            slug: this.item.slug,
            currency: this.item.currency
        }
    }

}