const Modification = require('../../lib/modification')
const { getLangText } = require('../../helpers/functions')

const facade = require('./facade')
const _ = require('lodash')
module.exports = class WidgetModificatin extends Modification {
    constructor(...args) {
        super(...args)
        this.schema = {}
    }

    async init() {
    }
    toJSON() {
        return _.merge({}, {values: this.schema}, this.item)
    }
  

}