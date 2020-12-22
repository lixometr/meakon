const WidgetModification = require("../modification");

module.exports = class Header extends WidgetModification {
    constructor(...args) {
        super(...args)
        this.schema = {
            logo: {},
            logo_mob: {},
            phone: '',
            phone_en: '',
            menu: [
                {
                    name: '',
                    name_en: '',
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