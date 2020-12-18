const WidgetModification = require("../modification");

module.exports = class Header extends WidgetModification {
    constructor(...args) {
        super(...args)
        this.schema = {
            logo: {},
            logo_mob: {},
            phone: '',
            menu: [
                {
                    name: '',
                    url: '',
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