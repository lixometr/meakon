const WidgetModification = require("../modification");

module.exports = class Footer extends WidgetModification {
    constructor(...args) {
        super(...args)
        this.schema = {
            leftText: '',
            leftText_en: '',
            rightText: '',
            rightText_en: '',

        }
    }

    // toINFO() {
    //     return {
    //         values: this.item.val
    //     }
    // }

}