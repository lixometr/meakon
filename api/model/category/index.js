const controller = require('./controller')
const facade = require('./facade')
const modification = require('./modification')
class Model {
    constructor() {
        this.facade = facade
        this.modification = modification
        this.controller = controller
    }
}
module.exports = new Model()