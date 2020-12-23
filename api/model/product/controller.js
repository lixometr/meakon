const Controller = require('../../lib/controller')
const productFacade = require('./facade')
const categoryFacade = require('../category/facade')
const settingsFacade = require('../settings/facade')
const AppError = require('../../helpers/error');
const Modification = require('./modification');
const config = require('../../config');
const _ = require('lodash');
class ProductController extends Controller {
    constructor(...args) {
        super(...args)
    }


    /**
     * 
     * @param ?date=date
     */
    async getProductsByCategorySlug(req, res, next) {
        try {
            let filters = req.query.filters || '{}'
            const category = await categoryFacade.findBySlug(req.params[0])
            if (!category) throw new AppError(400)
            let result;
            try {
                filters = JSON.parse(filters)
            } catch(err) {
                console.log(filters)
                throw new AppError(400)
            }
            result = await this.facade.findByCategoryIdWithFilter(category._id, filters, { nowPage: req.query.page, perPage: req.query.per_page, })
            result.items = await this.initItems(result.items, { req })
            //filters { price: [min, max], attributes: [ { name: { slug: '', name: "" }, value: [ {name: '',} ] } ] }
            res.json(result)
        }
        catch (err) {
            next(err)
        }
    }

    async getSimilarProductsBySlug(req, res, next) {
        try {
            const result = await this.facade.findSimilarProductsBySlug(req.params.slug, { nowPage: req.query.page, perPage: req.query.per_page })
            result.items = await this.initItems(result.items, { req })
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
    async getBestSellers(req, res, next) {
        try {
            const { value: bestSellerId } = await settingsFacade.findByName('best_seller')
            if (!bestSellerId) return res.json([])

            let result = await this.facade.findByFlag(bestSellerId)
            result.items = await this.initItems(result.items, { req })
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
    async getHotOffers(req, res, next) {
        try {
            const { value: hotOfferId } = await settingsFacade.findByName('hot_offer')
            if (!hotOfferId) return res.json([])
            const result = await this.facade.findHotOffers(hotOfferId)
            const resolvers = result.map(async item => {
                return {
                    ...item,
                    products: await this.initItems(item.products, { req })
                }
            })
            const items = await Promise.all(resolvers)
            /*
                [
                    {
                        category: {},
                        products: {}
                    }
                ]

            */
            res.json(items)
        } catch (err) {
            next(err)
        }
    }

    async findByDate(req, res, next) {
        try {
            const result = await this.facade.findByDateWithPagination(req.params.date, req.request.region._id.toString())
            const toSend = {
                ...result
            }
            toSend.items = await this.initItems(toSend.items, { req })
            console.log(toSend)
            res.json(toSend)
        } catch (err) {
            next(err)
        }
    }


    // async getBreadcrumbs(req, res, next) {
    //     try {
    //         await this.facade.getBreadcrumbsBySlug(req.params.slug)
    //     } catch(err) {
    //         next(err)
    //     }
    // }

}

module.exports = new ProductController(productFacade, Modification)
