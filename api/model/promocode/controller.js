const Controller = require('../../lib/controller')
const promocodeFacade = require('./facade')
const AppError = require('../../helpers/error')
const Modification = require('./modification')

class PromocodeController extends Controller {
    async check(req, res, next) {
        try {
            const promo = req.body.promocode
            const result = await this.facade.check(promo)
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
    async findByName(req, res, next) {
        try {
            const promo = req.params.name
            const result = await this.facade.findByName(promo)
            const item = await Modification.initItem(result, 'info', { req })


            res.json(item)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new PromocodeController(promocodeFacade, Modification)
