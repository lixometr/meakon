const Controller = require('../../lib/controller')
const searchFacade = require('./facade')
const productsController = require('../product/controller')
const categoriesController = require('../category/controller')
const AppError = require('../../helpers/error')
const Modification = require('./modification')

class SearchController extends Controller {
    async search(req, res, next) {
        // search categories
        let categories = []
        await categoriesController.search(req, { json(body) { categories = body } }, next)

      
        // search products (paginate)
        let products = {}
        await productsController.search(req, { json(body) { products = body } }, next)
      
        res.json({
            categories,
            products,
        })
    }

}

module.exports = new SearchController(searchFacade, Modification)
