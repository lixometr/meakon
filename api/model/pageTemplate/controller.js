const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const Modification = require('./modification')
const facade = require('./facade')

class PageTemplate extends Controller {


}

module.exports = new PageTemplate(facade, Modification)
