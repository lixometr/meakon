const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const Modification = require('./modification')
const facade = require('./facade')

class BlogPostController extends Controller {

}

module.exports = new BlogPostController(facade, Modification)
