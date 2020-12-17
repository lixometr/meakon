const Facade = require('../../lib/facade')
const promocodeSchema = require('./schema')

class PromocodeFacade extends Facade {
    constructor(...atrs) {
        super(...atrs)

    }
    async check(name) {
        const item = await this.findByName(name)
        if(!item) return false
        const isValid = this.validate(item)
        if(!isValid) return false
        return true
    }
    async findByName(name) {
        const item = await this.Model.findOne({
            name
        })
        return item
    }
    validate(item, user) {
        if(new Date().getTime() > new Date(item.end_date).getTime()) {
            return false
        }
        if(item.use_count <= item.use_times) return false
        if(user) {
            if(user.used_promocodes) {
                const promoInUser = user.used_promocodes.find(item => item.promocode.toString() === item._id.toString())
                if(promoInUser) {
                    if(item.use_user_count !== -1 && promoInUser.times >= item.use_user_count) return false
                }
            }
        }
        return true
    }
}

module.exports = new PromocodeFacade('Promocode', promocodeSchema)
