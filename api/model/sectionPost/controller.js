const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const Modification = require('./modification')
const facade = require('./facade')

class SectionPostController extends Controller {
    async findSectionItemsById(req, res, next) {
        try {
            let items = await this.facade.findSectionItems(req.params.id)
            const result = await this.facade.paginate({ items, perPge: req.query.per_page, nowPage: req.query.per_page })
            result.items = await this.initItems(items, { req })
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
    async findSectionItemsBySlug(req, res, next) {
        try {
            const item = await this.facade.findBySlug(req.params.slug)
            req.params.id = item._id.toString()
            await this.findSectionItemsById(req, res, next)
            return
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new SectionPostController(facade, Modification)
