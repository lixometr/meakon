const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const Modification = require('./modification')
const facade = require('./facade')

class SectionTag extends Controller {

}

module.exports = new SectionTag(facade, Modification)
