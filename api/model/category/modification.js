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

    }

    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            image: this.item.image,
            image_person: this.item.image_person,
            image_text: this.item.image_text,
            image_bg: this.item.image_bg,
            is_soon: this.item.is_soon,
            soon_color1: this.item.soon_color1,
            soon_color2: this.item.soon_color2,
            is_new: this.item.is_new,
            new_color1: this.item.new_color1,
            new_color2: this.item.new_color2,
            slug: this.item.slug,
            parent: this.item.parent,
            created_at: this.item.created_at,
            full_slug: this.item.full_slug,
            is_primary: this.item.is_primary,
            seo: this.item.seo || {}

        }
    }


}