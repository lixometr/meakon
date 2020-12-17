const controller = require('./controller')
const Router = require('express').Router
const router = new Router()
const { body } = require('express-validator')

router.post('/subscribe', (...args) => controller.subscribe(...args))
router.post('/contact', (...args) => controller.contact(...args))
module.exports = router
