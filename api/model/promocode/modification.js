const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class PromocodeModification extends Modification {
    initValue() {
        this.item.value = facade.getRegionItem(this.item.value, this.region._id, this.defaultRegion._id)
    }
    async init() {
        this.initValue()
    }
    toINFO() {
        return {
            name: this.item.name,
            value: this.item.value,
            sale_type: this.item.sale_type,
            use_count: this.item.use_count,
            use_user_count: this.item.use_user_count,
            end_date: this.item.end_date,
        }
    }
  
}