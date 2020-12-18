const WidgetModification = require("../modification");

module.exports = class Footer extends WidgetModification {
    constructor(...args) {
        super(...args)
        this.schema = {
            leftText: '',
            rightText: '',

        }
    }

    // toINFO() {
    //     return {
    //         values: this.item.val
    //     }
    // }

}