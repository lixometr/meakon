const Facade = require('../../lib/facade')
const RegionSchema = require('./schema')
const data = require('./data.json')
class RegionFacade extends Facade {
    constructor(...args) {
        super(...args)
    }
    async findBySlug(slug) {
        const item = await this.Model.findOne({ slug })
        return item
    }
    async defineRegion(country) {
        return data[country]
    }

}

module.exports = new RegionFacade('Region', RegionSchema)
