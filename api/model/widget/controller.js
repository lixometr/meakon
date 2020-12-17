const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const widgetFacade = require('./facade')
const Modification = require('./modification')
const widgets = require('./widgets')
class WidgetController extends Controller {
    async findByName(req, res, next) {
        try {
            const item = await this.facade.findByName(req.params.name)
            let instance = item
            const name = req.params.name
            const Widget = widgets[name]
            if (Widget) {
                instance = new Widget(item, { req })
            }
            else {
                instance = new Modification(item, { req })
            }
            if (req.adminUser) {
                res.json({
                    schema: instance.schema,
                    values: instance.toJSON().values
                })
                return
            }
            await instance.init()
            res.json({
                schema: instance.schema,
                values: instance.toJSON().values
            })
        } catch (err) {
            next(err)
        }
    }
    async updateByName(req, res, next) {
        try {
            const item = await this.facade.findByName(req.params.name)
            if (!item) {
                await this.facade.create({
                    name: req.params.name,
                    ...req.body
                })
                res.json({ ok: true })
                return
            }
            const result = await this.facade.updateByName(req.params.name, {
                name: req.params.name,
                ...req.body
            })
            res.json({ ok: true })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new WidgetController(widgetFacade, Modification)
