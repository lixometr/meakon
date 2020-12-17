const WidgetModification = require("../modification");

module.exports = class ProductSidebar extends WidgetModification {
    constructor(...args) {
        super(...args)
        this.schema = {
           
            items: [
                {
                    title: '',
                    sub_title: '',
                    description: ''
                }
            ]
        }
    }

    // toINFO() {
    //     return {
    //         values: this.item.val
    //     }
    // }

}