const Controller = require('../../lib/controller')
const authFacade = require('./facade')
const userFacade = require('../user/facade')
const { validationResult } = require('express-validator')
const config = require('../../config')
const jwt = require('jsonwebtoken')
const UserModification = require('../user/modification')
const AppError = require('../../helpers/error')
const { generateConfirmLink, generateRestoreLink } = require('../../helpers/functions')
const Event = require('./event')
class AuthController extends Controller {
    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new AppError(200, 'Некорректные данные', 'invalidData')
            }
            const email = req.body.email
            const password = req.body.password
            // const remember = req.body.remember
            const isValid = await userFacade.check(email, password)
            if (!isValid) throw new AppError(200, null, 'userInvalidData')
            const user = await userFacade.findByEmail(email)
            if (!user.is_confirmed) throw new AppError(200, null, 'userInvalidData')
            const expires = config.JWT_EXPIRES
            const token = jwt.sign({ id: user._id, exp: (Date.now() / 1000) + expires }, config.JWT_SECRET)
            const userToSend = new UserModification(user, { req }).toINFO()
            res.json({
                ok: true,
                token,
                tokenExpires: expires,
                user: userToSend
            })

        } catch (err) {
            next(err)
        }
    }
    async signup(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new AppError(200, null, 'invalidData')
            }
            const email = req.body.email
            const password = req.body.password
            const first_name = req.body.first_name
            const last_name = req.body.last_name
            const isExist = await userFacade.findByEmail(email)
            if (isExist) throw new AppError(409, null, 'userExist')
            const user = await userFacade.create({
                email,
                password,
                first_name,
                last_name
            })
            // generate confirm link
            const confirm_link = generateConfirmLink(user.confirm_key)

            if (!user) throw new AppError(500)
            Event.emit('signup', {
                first_name,
                last_name,
                email,
                password,
                confirm_link,
                confirm_key: user.confirm_key
            })

            res.json({
                ok: true,

            })
        } catch (err) {
            next(err)
        }
    }
    // Восстановление пароля по email
    async restore(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                throw new AppError(200, null, 'userInvalidData')
            }
            const email = req.body.email
            const user = await userFacade.findByEmail(email)
            if (!user) throw new AppError(200, null, 'userNotFound')
            const key = await userFacade.restorePassword(user._id)
            const restore_link = generateRestoreLink(key)
            Event.emit('restore', {
                email,
                restore_link,
            })
            res.json({ ok: true })
        } catch (err) {
            next(err)
        }
    }
    // сброс пароля
    async reset(req, res, next) {
        try {
            const key = req.params.key
            const data = req.body
            const password = data.password
            const user = await userFacade.findByResetKey(key)
            if (!user) throw new AppError(200, null, 'userInvalidData')
            await userFacade.resetPassword(user._id, {
                password,
            })
            res.json({ ok: true })
        } catch (err) {
            next(err)
        }
    }

    // Подтверждение пользователя
    async confirm(req, res, next) {
        try {
            const confirmKey = req.params.key
            const user = await userFacade.findByConfirmKey(confirmKey)
            if (!user) throw new AppError(200, null, 'userNotFound')
            await userFacade.confirm(user._id)
            res.json({ ok: true })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new AuthController(authFacade, null, Event)
