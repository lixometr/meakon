const Modification = require('../../lib/modification')
const facade = require('./facade')
const _ = require("lodash")
const categoryFacade = require('../category/facade')
const { now } = require('lodash')
module.exports = class ManufacturerModification extends Modification {
    async initValues() {
        const initField = async function ini(field, values, path) {
            const type = field.type
            const nowPath = path ? `${path}.${field.var_name}` : field.var_name
            // const nextPath = 
            if (type === 'block') {
                const fields = field.settings && field.settings.fields
                if (!fields) return values

                const resolvers = fields.map(async f => await ini(f, values, nowPath))
                await Promise.all(resolvers)
            }
            if (type === 'accordion') {
                const fields = field.settings && field.settings.fields
                if (!fields) return values
                const resolvers = fields.map(async f => await ini(f, values, nowPath))
                await Promise.all(resolvers)
            }
            if (type === 'tab') {
                const fields = field.settings && field.settings.fields
                if (!fields) return values
                const resolvers = fields.map(async subField => {
                    if (!subField.fields || !_.isArray(subField.fields)) return
                    const resolvers = subField.fields.map(async f => {
                        await ini(f, values, nowPath)
                    })
                    await Promise.all(resolvers)
                })
                await Promise.all(resolvers)

            }
            if (type === 'categories') {
                const value = _.get(values, nowPath)
                if (!_.isArray(value)) return values
                
                const resolvers = value.map(async cId => {
                    return await categoryFacade.findById(cId)
                })
                const items = await Promise.all(resolvers)
                console.log('oh items', items)
                _.set(values, nowPath, items)

            }
        }
        const resolvers = this.item.template.fields.map(async field => {
            await initField(field, this.item.values)
        })
        await Promise.all(resolvers)
    }
    async populate() {
        await this.mongooseItem.populate('template').execPopulate()
        this.item.template = this.mongooseItem.template
    }
    async init(type) {
        await this.populate()
        await this.initValues()
    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            slug: this.item.slug,
            values: this.item.values,
            template: this.item.template,
            seo: this.item.seo || {}

        }
    }
    toFULL() {
        return {
            ...this.toINFO(),
        }
    }

}