const Facade = require('../../lib/facade')
const ProductSchema = require('./schema')
const AppError = require('../../helpers/error')
const _ = require('lodash')
const categoryFacade = require('../category/facade')
const attributeFacade = require('../attribute/facade')
const attributeValueFacade = require('../attributeValue/facade')
const Modification = require('./modification')
const { filter } = require('lodash')
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
        const finder = async catId => {
            return await this.find({ 'category': catId, is_published: true, }) || []
        }
        const items = await this.findInSublimeCategories(catId, finder)



        const paginateItems = await this.paginate({ items, perPage, nowPage })
        return paginateItems
    }
    async findByCategoryIdWithFilter(catId, activeFilters, { perPage, nowPage }) {
        const finder = async catId => {
            return await this.find({ 'category': catId, is_published: true, }) || []
        }
        let items = await this.findInSublimeCategories(catId, finder)
        const category = await categoryFacade.findById(catId)
        let filterItems = category.filter_attributes || []
        // items = await Modification.initItems(items, 'info', {})
        // const resolvers = filterItems.map(async itemId => {
        //     return await attributeFacade.findById(itemId)
        // })
        // filterItems = await Promise.all(resolvers)
        activeFilters = this.validateFilters(filterItems, activeFilters)
        items = await this.filterItems(items, activeFilters)

        let filters = {}

        filters = await this.getFilters(items, filterItems)

        const paginateItems = await this.paginate({ items, perPage, nowPage })
        return {
            ...paginateItems,
            filters
        }
    }
    validateFilters(availableFilters = [], activeFilters) {
        const attributes = activeFilters.attributes || {}
        const activeKeys = Object.keys(attributes).filter(attrId => {
            return availableFilters.findIndex(filterId => filterId.toString() === attrId.toString()) > -1
        })
        let activeAttributes = {}
        activeKeys.map(key => {
            activeAttributes[key] = attributes[key]
        })

        return {
            ...activeFilters,
            attributes: activeAttributes
        }
    }
    async getFilters(items, filterItems = [], availableFilters) {
        let filters = []
        let filtersMap = {}
        items.map(item => {
            const attributes = item.attributes || []
            attributes.map(attr => {
                const canBe = filterItems.findIndex(attrId => attrId.toString() === attr.name.toString()) > -1
                if(!canBe) return
                if (!filtersMap[attr.name.toString()]) filtersMap[attr.name.toString()] = []
                const attrValueArr = filtersMap[attr.name.toString()]
                attr.value.map(attrValue => {
                    if (attrValueArr.includes(attrValue.toString())) return
                    filtersMap[attr.name.toString()].push(attrValue.toString())
                })
            })
        })
        const resolvers = Object.keys(filtersMap).map(async attrId => {
            const attrValues = filtersMap[attrId]
            const name = await attributeFacade.findById(attrId)
            const resolvers = attrValues.map(async attrValueId => {
                return await attributeValueFacade.findById(attrValueId)
            })
            const value = await Promise.all(resolvers)
            return {
                name,
                value
            }
        })
        const attributes = await Promise.all(resolvers)
        const prices = items.map(item => item.price).filter(price => price >= 0)
        const price = [Math.min(...prices), Math.max(...prices)]
        return {
            attributes,
            price
        }
    }
    async filterItems(items, activeFilters = { attributes: {}, price: [] }) {
        // []
        // [ attrId, attrId ]
        // { attributes: {attrId: [attrValueId]}, price: [] }
        const activeAttributes = activeFilters.attributes || {}
        const activeAttributesKeys = Object.keys(activeAttributes)
        const activePrice = activeFilters.price || []
        let filtered = items.filter(item => {
            const attributes = item.attributes || []
            const results = activeAttributesKeys.map(attrId => {
                const activeValues = activeAttributes[attrId]
                if (!activeValues) return true
                const attrInItem = attributes.find(itemAttr => itemAttr.name.toString() === attrId.toString())
                if (!attrInItem) return false
                const attrInItemValues = attrInItem.value
                const hasActiveValues = attrInItemValues.map(attrValue => {
                    return activeValues.findIndex(activeVal => activeVal.toString() === attrValue.toString()) > -1
                })
                return hasActiveValues.includes(true)
            })
            return !results.includes(false)
        })
        if (activePrice && activePrice.length > 0) {
            console.log('have price', activePrice)
            filtered = filtered.filter(item => {
                const min = activePrice[0]
                const max = activePrice[1]
                console.log(min, 'and', item.price)
                if ( item.price > max || item.price < min) return false
                return true
            })
        }

        console.log('after filter attrs', filtered)

        return filtered
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
        if (!category) return []
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
        let catId = product.category[0]
        let result = await this.findByCategoryId(catId, { nowPage, perPage })
        result.items = result.items.filter(item => item._id.toString() !== product._id.toString())
        return result
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

