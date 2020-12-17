const Modification = require('../../lib/modification')
const facade = require('./facade')
const SectionModification = require('../section/modification')
module.exports = class SectionPostModification extends Modification {
    async init(type) {
        if (type === 'full') {
            await this.mongooseItem.populate('tags section').execPopulate()
            this.item.tags = this.mongooseItem.tags
            const instance = new SectionModification(this.mongooseItem.section, this.options)
            await instance.init('info')
            this.item.section = instance.toINFO()
        }
    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            slug: this.item.slug,
            section: this.item.template,
            created_at: this.item.created_at

        }
    }
    toFULL() {
        return {
            ...this.toINFO(),
            fields: this.item.fields,
            tags: this.item.tags,
        }
    }


}