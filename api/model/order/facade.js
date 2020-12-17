const Facade = require('../../lib/facade')
const _ = require('lodash')
const orderSchema = require('./schema')
const regionFacade = require('../region/facade')
const userFacade = require('../user/facade')
const productFacade = require('../product/facade')
const Event = require('./event')
// const ProductModel = require('../product/productModel')
const { getTotalPrice } = require('../../helpers/functions')
const shortid = require('shortid');
const Product = require('../../../common/models/product')

class OrderFacade extends Facade {
    constructor(...args) {
        super(...args)
    }
    async create(data, user) {
        let products = data.products
        if (products.length < 1) return
        products = _.cloneDeep(products)
        user = _.cloneDeep(user)
        user._id = user._id.toString()
        let promocode = data.promocode
        if (promocode) {
            promocode = _.cloneDeep(promocode)
        }
        const total_price = getTotalPrice(products, promocode)

        let region = await this._getRegion(data.region)
        if (region) {
            region = _.cloneDeep(region)
        }
        const order_id = shortid.generate()
        const order = new this.Model({
            products,
            user,
            total_price,
            payment_method: data.payment_method,
            status: 3,
            info: data.info,
            character: data.character,
            additional_info: data.additional_info,
            contact: data.contact,
            promocode,
            region,
            order_id
        })
        await order.save()
        return order
    }
    async _getRegion(region) {
        const item = await regionFacade.findBySlug(region)
        if (!item) return
        return item.toJSON()
    }
    // async _getPromocode(promocode, user) {
    //     const item = await promocodeFacade.findByName(promocode)
    //     if (!item) return
    //     const isValid = await promocodeFacade.validate(item, user)
    //     if (!isValid) return
    //     return item.toJSON()
    // }


    async validate(data) {

        return true
    }
    // async saveUs
    async findByUserId(userId) {
        return this.findWithPagination({
            query: {
                'user._id': userId.toString()
            },
            sort: {
                created_at: -1
            }
        })
    }
    async makePayed(id) {
        const order = await this.findById(id)
        if (order.status === 2 || order.status === 1) return
        order.status = 2
        const promocode = order.promocode
        const user = order.user || {}
        if (promocode) {
            await userFacade.usePromocode(user._id, promocode._id.toString())
        }
        let book = order.products.map(async product => {
            await productFacade.book(product)
            if (product.item.is_bonus) {
                await userFacade.useAward(user._id.toString(), product.item._id.toString())
            }
        })
        await Promise.all(book)
        await userFacade.addCoins(user._id, order.total_price)

        await order.save()

        Event.emit('changeStatus', order)
    }
    async changeStatus(id, newStatus) {
        const order = await this.findById(id)
        order.status = newStatus
        await order.save()
        return order
    }

    async findByOrderId(order_id) {
        return await this.findOne({ order_id })
    }
}

module.exports = new OrderFacade('Order', orderSchema)
