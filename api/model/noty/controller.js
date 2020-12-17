const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const Modification = require('./modification')
const facade = require('./facade')

class NotyController extends Controller {

    async findAll(req, res, next) {
        try {
            let page = req.query.page

            let perPage = req.query.per_page
            let { items, info } = await this.facade.findWithPagination({ nowPage: page, perPage, sort: { created_at: -1 } })

            const initedItems = await this.initItems(items, { req })

            const toSend = {
                items: initedItems,
                info
            }
            res.json(toSend)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new NotyController(facade, Modification)
