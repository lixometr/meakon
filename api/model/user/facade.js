const Facade = require('../../lib/facade')
const userSchema = require('./schema')
const bcrypt = require('bcrypt')
const config = require('../../config')
const settingsFacade = require('../settings/facade')
const { getRandom } = require('../../helpers/functions')
const productFacade = require('../product/facade')
const categoryFacade = require('../category/facade')
class UserFacade extends Facade {
    /**
    * 
    * @param {String} email 
    * @param {String} password 
    * @returns Boolean
    */
    async check(email, password) {
        const user = await this.Model.findOne({ email })
        if (!user) return false
        const result = await bcrypt.compare(password, user.password)
        return result
    }
    async findByEmail(email) {
        const result = await this.Model.findOne({ email })
        return result
    }
    async create(data) {
        let password = data.password
        password = await this.hashPassword(password)
        let confirm_key = await bcrypt.genSalt(10)
        confirm_key = confirm_key.replace(/\//g, '-')
        data = { ...data, password, confirm_key }
        const result = await this.Model.create(data)
        return result
    }

    async hashPassword(password) {
        const salt = await bcrypt.genSalt(8);
        return await bcrypt.hash(password, salt);
    }

    async updateInfo(userId, { first_name, last_name, phone, country, character, contact, keep_update } = {}) {
        const user = await this.findById(userId)
        if (!user) return false
        if (first_name !== undefined) {
            user.first_name = first_name
        }
        if (last_name !== undefined) {
            user.last_name = last_name
        }
        if (phone !== undefined) {
            user.phone = phone
        }
        if (country !== undefined) {
            user.country = country
        }
        if (character !== undefined && typeof character === 'object') {
            const { character_name,
                server_name,
                battle_tag,
                fraction,
                armory_link } = character
            const newCharacter = { ...user.character }
            if (character_name) {
                newCharacter.character_name = character_name
            }
            if (server_name) {
                newCharacter.server_name = server_name
            }
            if (battle_tag) {
                newCharacter.battle_tag = battle_tag
            }
            if (fraction) {
                newCharacter.fraction = fraction
            }
            if (armory_link) {
                newCharacter.armory_link = armory_link
            }
            user.character = newCharacter
        }

        if (contact !== undefined && typeof contact === 'object') {
            const { discord, skype } = contact
            const newContact = { ...user.contact }
            if (discord !== undefined) {
                newContact.discord = discord
            }
            if (skype !== undefined) {
                newContact.skype = skype
            }
            user.contact = newContact
        }
        if (keep_update !== undefined) {
            user.keep_update = keep_update
        }


        await user.save()
        return true
    }

    async changeEmail(id, { email }) {
        const user = await this.findById(id)
        user.email = email
        return await user.save()
    }
    async changePassword(id, { new_password }) {
        const user = await this.findById(id)
        const salt = await bcrypt.genSalt(8);
        const password = await bcrypt.hash(new_password, salt);
        user.password = password
        return await user.save()
    }
    async findByConfirmKey(key) {
        const user = await this.Model.findOne({ confirm_key: key })
        return user
    }
    async confirm(id) {
        const user = await this.findById(id)
        user.is_confirmed = true
        user.confirm_key = null
        return await user.save()
    }
    async removeUser(id) {
        const user = await this.findById(id)
        user.active = false
        await user.save()
    }
    async getAwards(id) {
        const user = await this.findById(id)
        const awards = [...user.awards]
        awards.sort((a, b) => new Date(b.got_at).getTime() - new Date(a.got_at).getTime())
        return awards
    }
    async giveAwards() {
        const users = await this.find({
            coins: {
                $gte: 500
            },
            award_status: 2
        })
        console.log('here are users', users)
        const resolvers = users.map(async user => {
            user.award_status = 1
            user.coins = 0
            const awards = await this._giveUserAwards()
            user.available_awards = awards
            await user.save()

        })
        await Promise.all(resolvers)
    }
    async _giveAwardFromProducts(products) {
        let chances_names = ['bonus_uncommon',
            'bonus_rare',
            'bonus_epic',
            'bonus_legendary']
        let chances = {}
        const resolvers = chances_names.map(async item => {
            const result = await settingsFacade.findByName(item)
            if (result) {
                chances[item] = parseFloat(result.value)
            } else {
                chances[item] = 0
            }
        })
        await Promise.all(resolvers)
        const chancesArray = products.map(product => {
            return chances['bonus_' + product.bonus_type]
        })
        const item = getRandom(products, chancesArray)
        return item
    }
    async _giveUserAwards() {
        const primaryCategories = await categoryFacade.findWithoutParent()
        let categoryProducts = primaryCategories.map(async category => {
            const items = await productFacade.getBonusItemsByCategory(category._id)
            return {
                items,
                category
            }
        })
        categoryProducts = await Promise.all(categoryProducts)
        console.log(categoryProducts)
        let result = categoryProducts.map(async item => {
            if (item.items.length < 1) return false
            const award = await this._giveAwardFromProducts(item.items)
            return {
                category: item.category,
                product: award
            }
        })
        result = await Promise.all(result)
        result = result.filter(item => !!item)
        return result
    }
    async getAvailableAwards(id) {
        const user = await this.findById(id)
        return user.available_awards
    }
    async usePromocode(userId, promoId) {
        const user = await this.findById(userId)
        let usedPromos = user.used_promocodes
        if (!usedPromos) usedPromos = []
        const promoIdx = usedPromos.findIndex(promo => promo.promocode.toString() === promoId.toString())
        if (promoIdx < 0) {
            usedPromos.push({
                promocode: promoId,
                times: 1
            })
        } else {
            usedPromos[promoIdx].times += 1
        }
        user.used_promocodes = usedPromos
        await user.save()
    }
    async restorePassword(id) {
        const user = await this.findById(id)
        let restore_key = await bcrypt.genSalt(10)
        restore_key = restore_key.replace('/', '-')
        user.restore_key = restore_key
        await user.save()
        return restore_key
    }
    async findByResetKey(restore_key) {
        return await this.Model.findOne({ restore_key })
    }
    async addCoins(id, coins) {
        const user = await this.findById(id)
        if (!user.coins) user.coins = 0
        if (!user.total_coins) user.total_coins = 0
        user.coins += coins
        user.total_coins += coins
        if (user.coins >= 500) {
            user.award_status = 2
        }
        await user.save()
    }
    async chooseAward(userId, pId) {
        const user = await this.findById(userId)
        const availableAwards = user.available_awards
        const awardIdx = availableAwards.findIndex(award => {
            return award.product._id.toString() === pId.toString()
        })
        if (awardIdx < 0) return false
        if (!user.awards) user.awards = []
        const activeAward = availableAwards[awardIdx]
        const newAward = {
            product: activeAward.product,
            category: activeAward.category,
            status: 1,
            got_at: new Date(),

        }
        const newAwards = [...user.awards, newAward]
        user.awards = newAwards
        user.award_status = 0
        user.available_awards = []
        user.coins = 0
        await user.save()
        return true
    }
    async useAward(userId, pId) {
        const user = await this.findById(userId)
        const awardIdx = user.awards.findIndex(award => {
            const equalsId = award.product._id.toString() === pId.toString()
            const status = award.status === 1
            return equalsId && status
        })
        if (awardIdx < 0) return false
    
        user.awards[awardIdx].status = 0
        await user.save()

        return true
    }
    async resetPassword(userId, { password } = {}) {
        const user = await this.Model.findById(userId)
        user.password = await this.hashPassword(password)
        await user.save()
        return user
    }

}

module.exports = new UserFacade('User', userSchema)
