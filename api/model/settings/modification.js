const Modification = require('../../lib/modification')
const facade = require('./facade')
module.exports = class SettingsModification extends Modification {
    async init(type) {

    }
    toINFO() {
        return {
            _id: this.item._id,
            name: this.item.name,
            value: this.item.value

        }
    }



}