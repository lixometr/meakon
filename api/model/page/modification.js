const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class ManufacturerModification extends Modification {

    async populate() {
        await this.mongooseItem.populate('template').execPopulate()
        this.item.template = this.mongooseItem.template
    }
    async init(type) {
        await this.populate()
    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            slug: this.item.slug,
            values: this.item.values,
            template: this.item.template,
            seo: this.item.seo || {}

        }
    }
    toFULL() {
        return {
            ...this.toINFO(),
        }
    }

}