const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const orderFacade = require('./facade')
const Modification = require('./modification')
const productFacade = require('../product/facade')
const ProductModification = require('../product/modification')
const userFacade = require('../user/facade')
const UserModification = require('../user/modification')
const promocodeFacade = require('../promocode/facade')
const PromocodeModification = require('../promocode/modification')
const ProductModel = require('../../../common/models/product')
const Event = require('./event')
const { generatePaymentLink } = require('../../services/payment')
const config = require('../../config')
// const {sendMail} = require('../../services/mail')
class OrderController extends Controller {
    async findByUserId(req, res, next) {
        try {
            const result = await this.facade.findByUserId(req.user._id.toString())
            result.items = await this.initItems(result.items, { req })
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
    async changeStatus(req, res, next) {
        try {
            const order = await this.facade.changeStatus(req.params.id, req.body.status)
            this.Event.emit('changeStatus', order)
            res.json({ ok: true })
        } catch (err) {
            next(err)
        }
    }

    async create(req, res, next) {
        try {
            const data = req.body
            const isValid = await this.facade.validate(data)
            if (!isValid) {
                throw new AppError(400, null, 'badRequest')
            }
            let products = data.products
            products = products.map(async item => {
                // id, cnt, variation, options, date
                const product = await productFacade.findById(item.id)
                if (!product) return false
                const initedItem = await ProductModification.initItem(product, 'full', { req })
                const pModel = new ProductModel(initedItem, item.variation, item.options, item.date, item.cnt)
                console.log("here free cnt", pModel.freeCnt)
                if (pModel.freeCnt !== false) {
                    if (pModel.freeCnt < item.cnt) item.cnt = pModel.freeCnt
                }
                if (item.cnt <= 0) return false;
                return {
                    cnt: item.cnt,
                    variation: item.variation,
                    options: item.options,
                    date: item.date,
                    item: initedItem,
                    id: item.id
                }
            })
            products = await Promise.all(products)
            products = products.filter(item => !!item)

            if (products.length < 1) throw new AppError(400, 'No products')
            data.products = products
            let promocode = data.promocode
            promocode = await promocodeFacade.findByName(promocode)
            if (promocode) {
                const isValid = await promocodeFacade.validate(promocode, req.user)
                if (!isValid) promocode = undefined
                const instance = new PromocodeModification(promocode, { req })
                await instance.init()
                promocode = instance.toJSON()
            }
            data.promocode = promocode


            const order = await this.facade.create(data, new UserModification(req.user).toFULL())
            if (!order) throw new AppError(400, null, 'badRequest')

            if (data.save_info === true) {
                await userFacade.updateInfo(req.user._id.toString(), {
                    ...data,
                    ...data.info
                })
            }
            if (order.total_price === 0) {
                await this.facade.makePayed(order._id)
                res.json({
                    payment_url: config.appUrl + '/payment/success?account=' + order.order_id,
                    ok: true
                })
                return
            }
            let payment_url = await generatePaymentLink(order.payment_method, {
                sum: order.total_price,
                currency: order.region.iso_currency,
                order_id: order.order_id,
                ip: req.ip
            })
            console.log(payment_url)
            res.json({
                ok: true,
                payment_url
            })
        } catch (err) {
            next(err)
        }
    }
    async findByOrderId(req, res, next) {
        try {

            const order_id = req.params.id
            const order = await this.facade.findByOrderId(order_id)
            if (!order) return res.json({})
            if (order.user._id.toString() !== req.user._id.toString()) return res.json({})
            res.json(order)
        } catch (err) {
            next(err)
        }
    }

    async _normilizeData(data, req,) {

    }
}

module.exports = new OrderController(orderFacade, Modification, Event)
