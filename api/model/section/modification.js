const Modification = require('../../lib/modification')
const facade = require('./facade')

module.exports = class BlogPostModification extends Modification {

    async init(type) {
        if (type === 'full') {
            await this.mongooseItem.populate('template').execPopulate()
            this.item.template = this.mongooseItem.template
        }
    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            slug: this.item.slug,
            template: this.item.template,
            created_at: this.item.created_at

        }
    }
    toFULL() {
        return {
            ...this.toINFO(),
        }
    }


}