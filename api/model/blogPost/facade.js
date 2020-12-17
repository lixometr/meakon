const Facade = require('../../lib/facade')
const blogPostSchema = require('./schema')

class BlogPostFacade extends Facade {
    constructor(...args) {
        super(...args)
    }
}

module.exports = new BlogPostFacade('BlogPost', blogPostSchema)
