const Modification = require('../../lib/modification')
const facade = require('./facade')

class AdminUserModification extends Modification {
   
    toINFO() {
        return {
            login: this.item.login,
            name: this.item.name
        }
    }
}
module.exports = AdminUserModification