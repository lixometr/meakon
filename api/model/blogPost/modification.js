const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class BlogPostModification extends Modification {

   async populateTags() {
       await this.mongooseItem.populate('tags').execPopulate()
       this.item.tags = this.mongooseItem.tags
   }
    async init() {
        await this.populateTags()
    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            short_name: this.item.short_name,
            slug: this.item.slug,
            image: this.item.image || {},
            short_title: this.item.short_title,
            tags: this.item.tags,
            created_at: this.item.created_at

        }
    }
    toFULL() {
        return {
            ...this.toINFO(),
            content: this.item.content
        }
    }
  

}