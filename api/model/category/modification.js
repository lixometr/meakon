const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class CategoryModification extends Modification {
    async init() {
        const parents = await facade.findParentsById(this.item._id)
        const fullPath = parents.reduce((path, item, idx) => {
            path += item.slug + '/'
            return path
        }, '')
        this.item.full_slug = fullPath
        this.item.is_primary = !!this.item.parent
        // await this.mongooseItem.populate('filter_attributes')
        // this.item.filter_attributes = this.mongooseItem.filter_attributes

    }

    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            name_en: this.item.name_en,
            image: this.item.image,

            slug: this.item.slug,
            parent: this.item.parent,
            created_at: this.item.created_at,
            full_slug: this.item.full_slug,
            is_primary: this.item.is_primary,
            seo: this.item.seo || {}

        }
    }


}