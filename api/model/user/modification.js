const Modification = require('../../lib/modification')
const productModification = require('../product/modification')
module.exports = class UserModification extends Modification {
    constructor(...args) {
        super(...args)
    }
    async initFavourite() {
        await this.mongooseItem.populate('favourite').execPopulate()
        const favourites = this.mongooseItem.favourite
        const resolvers = favourites.map(async product => {
            const instance = new productModification(product, this.options)
            await instance.init()
            return instance.toINFO()
        })
        const items = await Promise.all(resolvers)
        this.item.favourite = items
    }
    async init() {

    }
    toINFO() {
        return {
            _id: this.item._id,
            email: this.item.email,
            phone: this.item.phone,
            role: this.item.role,
            first_name: this.item.first_name,
            last_name: this.item.last_name,
            phone: this.item.phone,
            country: this.item.country,
            coins: this.item.coins,
            award_status: this.item.award_status
        }
    }
    toFULL() {
        return {
            ...this.toINFO(),
            contact: this.item.contact,
            character: this.item.character,
            keep_update: this.item.keep_update
        }
    }
    toADMIN() {
        return {
            ...this.toFULL(),
            is_confirmed: this.item.is_confirmed,
            confirm_link: this.item.confirm_link,
            created_at: this.item.created_at
        }
    }

}