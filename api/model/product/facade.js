const Facade = require('../../lib/facade')
const ProductSchema = require('./schema')
const AppError = require('../../helpers/error')
const _ = require('lodash')
const categoryFacade = require('../category/facade')
class ProductFacade extends Facade {
    constructor(...args) {
        super(...args)
        this.relations = [

        ]
    }
    async search(text) {
        return this.Model.find({
            name: RegExp(text, 'ig'),

        })
    }
    async findByFlag(flagId) {
        const result = await this.findWithPagination({
            query: { flags: flagId },
            sort: { sort_order: 1 }
        })
        return result
    }

    async findHotOffers(hotOfferId) {
        // const result = await this.findWithPagination({
        //     query: { flags: hotOfferId },
        //     sort: { sort_order: 1 }
        // })
        const primaryCategories = await categoryFacade.findWithoutParent()
        const finder = async catId => {
            return await this.find({
                category: catId,
                flags: hotOfferId,
                is_published: true
            })
        }
        const resolvers = primaryCategories.map(async category => {
            return {
                category,
                products: await this.findInSublimeCategories(category._id, finder)
            }
        })
        const items = await Promise.all(resolvers)
        return items
    }
    async findByDateWithPagination(date, region) {
        const nextDate = new Date(date)
        nextDate.setDate(nextDate.getDate() + 1)
        const products = await this.findWithPagination({
            query: {
                is_published: true,
                'date.date': {
                    $elemMatch: {
                        value: {
                            $gte: new Date(date),
                            $lte: nextDate
                        },
                        region
                    }
                }
            },
            sort: { sort_order: 1 }
        })
        return products
    }
    async findByCategoryId(catId, { perPage, nowPage }) {
        // const inPrimaryCategory = await this.findWithPagination({ query: , perPage, nowPage, sort: { sort_order: 1 } })
        const finder = async catId => {
            return await this.find({ 'category': catId, is_published: true, }) || []
        }
        const items = await this.findInSublimeCategories(catId, finder)
        const paginateItems = await this.paginate({ items, perPage, nowPage })
        return paginateItems
    }
    async findByCategoryIdAndDateWithPagination(catId, date, region, { perPage, nowPage }) {
        const nextDate = new Date(date)
        nextDate.setDate(nextDate.getDate() + 1)

        const finder = async catId => {
            return await this.find({
                is_published: true,
                'category': catId,
                'date.date': {
                    $elemMatch: {
                        value: {
                            $gte: new Date(date),
                            $lte: nextDate
                        },
                        region
                    }
                }
            })
        }
        const items = await this.findInSublimeCategories(catId, finder)
        const paginateItems = await this.paginate({ items, perPage, nowPage })
        return paginateItems

    }

    async findInSublimeCategories(catId, finder) {
        const category = await categoryFacade.findById(catId)
        let catItems = []
        if (category.parent) {
            catItems = [category]
        } else {
            let catChildren = await categoryFacade.findChildrenById(catId) || []
            catItems = catChildren.concat([category])
        }

        const resolvers = catItems.map(async child => {
            const items = await finder(child._id)
            return items || []
        })

        let items = await Promise.all(resolvers)

        items = items.reduce((arr, item) => {
            arr = arr.concat(item)
            return arr
        }, [])

        items = items.filter((item, index) => items.findIndex((itm) => itm._id.toString() === item._id.toString()) === index)
        items.sort((a, b) => b.sort_order - a.sort_order)
        return items
    }

    async findSimilarProductsBySlug(slug, { nowPage, perPage }) {
        const product = await this.findBySlug(slug)
        if (!product) throw new AppError(404)
        const catId = product.primary_category
        let items = await this.findByCategoryId(catId, { nowPage, perPage })
        items = items.filter(item => item._id.toString() !== product._id.toString())
        return items
    }



    async getBonusItems() {
        return await this.Model.find({
            is_bonus: true
        })
    }
    async getBonusItemsByCategory(catId) {
        const finder = async catId => {
            return await this.find({
                is_bonus: true,
                category: catId
            })
        }
        const items = await this.findInSublimeCategories(catId.toString(), finder)
        return items
    }

    async book(product) {
        const cnt = product.cnt
        const dateId = product.date
        const item = await this.findById(product.id)
        console.log('booking', product)
        if (!item) return
        if (dateId) {
            const productDates = [...item.date]
            const dateIdx = productDates.findIndex(d => d._id.toString() === dateId)
            if (dateIdx < 0) return
            if (!productDates[dateIdx].booked_cnt) productDates[dateIdx].booked_cnt = 0
            productDates[dateIdx].booked_cnt += cnt
            item.date = productDates
        }

        await item.save()
    }


}

module.exports = new ProductFacade('Product', ProductSchema)

