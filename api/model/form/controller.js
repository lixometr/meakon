const Controller = require('../../lib/controller')
const config = require('../../config')
const AppError = require('../../helpers/error')
const Event = require('./event')
const formFacade = require('./facade')
class FormController extends Controller {
    async subscribe(req, res, next) {
        try {
            this.Event.emit('subscribe', req.body)
            res.json({ ok: true })

        } catch (err) {
            next(err)
        }
    }
    async contact(req, res, next) {
        try {

            this.Event.emit('contact', req.body)
            res.json({ ok: true })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new FormController(formFacade, null, Event)
