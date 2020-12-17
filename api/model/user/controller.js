
const AppError = require('../../helpers/error')
const Controller = require('../../lib/controller')
const userFacade = require('./facade')
const Modification = require('./modification')
const Event = require('./event')
class UserController extends Controller {
    async getInfo(req, res, next) {
        try {
            const user = await Modification.initItem(req.user, 'full', {req})
            res.json(user)
        } catch (err) {
            next(err)
        }
    }
    async updateInfo(req, res, next) {
        try {
            const first_name = req.body.first_name
            const last_name = req.body.last_name
            const phone = req.body.phone
            const country = req.body.country
            const done = await this.facade.updateInfo(req.user._id, { first_name, last_name, phone, country })
            if (!done) throw new AppError(200, null, 400)
            this.Event.emit('updateInfo')
            res.json({ ok: true })
        } catch (err) {
            next(err)
        }
    }
    /*
        {
            newPassword: '',
            password: '',
            newPasswordRepeat: ''
        }
    */
    async changePassword(req, res, next) {
        try {

            const { new_password, password, new_password_repeat } = req.body
            if (new_password !== new_password_repeat) throw new AppError(200, '', 'passwordsNotEquals')
            if (new_password === password) throw new AppError(200, '', 'passwordsAreSimilar')
            const check = await this.facade.check(req.user.email, password)
            if (!check) throw new AppError(200, '', 'passwordIncorrect')
            const result = await this.facade.changePassword(req.user._id, { new_password })
            this.Event.emit('changePassword')

            res.json({ ok: true, })
        } catch (err) {
            next(err)
        }
    }
    /*
       {
           email: '',
           password: '',
       }
   */
    async changeEmail(req, res, next) {
        try {
            const { email, password } = req.body
            // Совпадает ли пароль
            const check = await this.facade.check(req.user.email, password)
            if (!check) throw new AppError(200, '', 'passwordIncorrect')
            // Есть ли юзер с таким email
            const hasEmail = await this.facade.findByEmail(email)
            if (hasEmail) throw new AppError(200, '', 'userExist')
            const result = await this.facade.changeEmail(req.user._id, { email })
            res.json({ ok: true })
        } catch (err) {
            next(err)
        }
    }

    async findAwards(req, res, next) {
        const awards = await this.facade.getAwards(req.user._id)
        res.json(awards)
    }
    async findAvailableAwards(req, res, next) {
        try {
            const awards = await this.facade.getAvailableAwards(req.user._id)
            res.json(awards)
        } catch (err) {
            next(err)
        }
    }
    async chooseAward(req, res, next) {
        try {
            const product = req.body.product
            const done = await this.facade.chooseAward(req.user._id.toString(), product)
            if (!done) throw new AppError(400)
            res.json({ ok: true })
        } catch (err) {
            next(err)
        }
    }
    async removeYourself(req, res, next) {
        try {
            await this.facade.removeUser(req.user._id.toString())
            res.json({ ok: true })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new UserController(userFacade, Modification, Event)
