const facade = require('./facade')
const Modification = require('../../lib/modification')
const CategoryModification = require('../category/modification')
const AttributeModification = require('../attribute/modification')
const AttributeValueModification = require('../attributeValue/modification')
const ProductModel = require('../../../common/models/product')
module.exports = class ProductModification extends Modification {
    constructor(item, options) {
        super(item, options)

    }

    async init() {

        this.initDates()
        await this.populateFields()
        await this.initVariations()

        this.initPrice()
        this.initProductOptions()
        this.initFromPrice()
    }
    initDates() {
        this.item.date = this.item.date.map(date => {
            const itemDate = facade.getRegionItem(date.date, this.region._id, this.defaultRegion._id)
            if (!itemDate) return false
            return {
                ...date.toJSON(),
                date: itemDate,
                free_cnt: date.cnt - date.booked_cnt
            }
        }).filter(date => !!date)
    }
    async populateFields() {
        await this.mongooseItem.populate('product_variations.attr').execPopulate()
        await this.mongooseItem.populate('product_variations.attrValue').execPopulate()
        await this.mongooseItem.populate('category').execPopulate()
        await this.mongooseItem.populate('attributes.name').execPopulate()
        await this.mongooseItem.populate('attributes.value').execPopulate()
        this.item.product_variations = this.mongooseItem.product_variations
        const category = this.mongooseItem.category.map(async cat => {
            const instance = new CategoryModification(cat, this.options)
            await instance.init()
            return instance.toINFO()
        })
        this.item.category = await Promise.all(category)
        this.item.attributes = this.mongooseItem.attributes
    }
    initProductOptions() {
        if (this.item.product_type === 'simple') {
            this.item.product_options = this.initOptions(this.item.product_options)
        }
    }
    initPrice() {
        if (this.region._id || this.defaultRegion._id) {
            this.item.price = facade.getRegionItem(this.item.price, this.region._id, this.defaultRegion._id)
            this.item.old_price = facade.getRegionItem(this.item.old_price, this.region._id, this.defaultRegion._id)
        }
    }
    initFromPrice() {
        let fromPrice
   
        let variationId = null
        if (this.item.product_type === 'variation') {
            variationId = this.item.product_variations[0].attrValue._id.toString()
        }
        let model = new ProductModel(this.item, variationId, null, null, 1)
        const options = model.getProductOptions()
        let activeOptions = {}
        options.forEach(option => {
            const type = option.type
            let values = []
            if (type === "range") {
                values.push(option.values[0].settings.from)
                values.push(option.values[0].settings.from + option.values[0].settings.step)
            } else if (type === 'checkbox') {
                return
            } else {
                values = [option.values[0]._id.toString()]
            }
            activeOptions[option._id.toString()] = values
        })
        model = new ProductModel(this.item, variationId, activeOptions, null, 1)
        this.item.from_price = model.getTotalPrice()
    }
    initOptions(product_options) {
        return product_options.map(option => {
            const values = option.values.map(optVal => ({
                price: facade.getRegionItem(optVal.price, this.region._id, this.defaultRegion._id),
                name: optVal.name,
                settings: optVal.settings,
                _id: optVal._id
            }))
            return {
                values,
                name: option.name,
                type: option.type,
                settings: option.settings,
                description: option.description,
                _id: option._id
            }
        })
    }
    async initVariations() {
        if (!this.item.product_variations) return
        const resolvers = this.item.product_variations.map(async (variation, idx) => {
            const price = facade.getRegionItem(variation.price, this.region._id, this.defaultRegion._id)
            const old_price = facade.getRegionItem(variation.old_price, this.region._id, this.defaultRegion._id)
            let attr = new AttributeModification(variation.attr, this.options)
            await attr.init()
            attr = attr.toINFO()
            let attrValue = new AttributeValueModification(variation.attrValue, this.options)
            await attrValue.init()
            attrValue = attrValue.toINFO()
            let product_options = variation.product_options
            product_options = this.initOptions(product_options)
            return Object.assign({}, {
                attr,
                attrValue,
                price,
                old_price,
                product_options,
                sku: variation.sku,
                _id: variation._id
            })
        })
        const items = await Promise.all(resolvers)
        this.item.product_variations = items

    }

    toJSON() {
        return this.item
    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            price: this.item.price,
            old_price: this.item.old_price,
            default_image: this.item.default_image || {},
            description: this.item.description,
            images: this.item.images,
            product_type: this.item.product_type,
            is_available: this.item.is_available,
            slug: this.item.slug,
            date: this.item.date,
            is_published: this.item.is_published,
            category: this.item.category.map(cat => new CategoryModification(cat).toINFO()),
            created_at: this.item.created_at,
            seo: this.item.seo || {},
            from_price: this.item.from_price

        }
    }
    toFULL() {
        return this.toJSON()
    }


}