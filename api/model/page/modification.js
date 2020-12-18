const Modification = require('../../lib/modification')
const facade = require('./facade')
const _ = require("lodash")
module.exports = class ManufacturerModification extends Modification {
    async initValues() {
        const initField = function ini(field, values, path) {
            const type = field.type
            const nowPath = path
            const nextPath = path ? `${nowPath}.${field.var_name}` : field.var_name
            if (type === 'block') {
                const fields = field.settings && field.settings.fields
                if (!fields) return values
                fields.forEach(f => ini(f, values, nextPath))
            }
            if (type === 'accordion') {
                const fields = field.settings && field.settings.fields
                if (!fields) return values
                fields.forEach(f => ini(f, values, nextPath))

            }
            if (type === 'tab') {
                const fields = field.settings && field.settings.fields
                if (!fields) return values
                fields.forEach(subField => {
                    if(!subField.fields || !_.isArray(subField.fields)) return
                    subField.fields.forEach(f => {
                        ini(f, values, nextPath)

                    })
                })

            }
            if (type === 'product') {
                const value = _.get(values, nowPath)
                if (!_.isArray(value)) return values
                value.map(pId => {

                })
                // initField(field, values)

            }
        }
        this.item.template.fields.forEach(field => {
            initField(field, this.item.values)
        })
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