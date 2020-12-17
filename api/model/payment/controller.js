const Controller = require('../../lib/controller')
const userFacade = require('../user/facade')
const orderFacade = require('../order/facade')
const orderEvent = require('../order/event')
const paymentFacade = require('./facade')
const config = require('../../config')
const AppError = require('../../helpers/error')
const Event = require('./event')
const unitpay = require('../../services/unitpay')
class PaymentController extends Controller {
    async result(req, res, next) {
        try {
            const query = req.query
            const method = query.method
            const params = query.params || {}
            const order_id = params.account
            const order = await orderFacade.findByOrderId(order_id)
            console.log('got order', order)
            console.log('received request', query)
            if (!order) {
                res.json({
                    error: {
                        message: "No order found"
                    }
                })
                return
            }
            // const isValid = unitpay.validateSignature(params.signature, params, method)

            if (method === 'pay') {
                await orderFacade.makePayed(order._id)
                this.Event.emit('newOrder')
                res.json({
                    "result": {
                        "message": "Запрос успешно обработан"
                    }
                })
            }
            if (method === 'check') {
                res.json({
                    "result": {
                        "message": "Запрос успешно обработан"
                    }
                })
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = new PaymentController(paymentFacade, null, Event)
