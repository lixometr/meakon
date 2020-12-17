const controller = require('./controller')
const Router = require('express').Router
const router = new Router()
const { body } = require('express-validator')

router.get('/unitpay/result', (...args) => controller.result(...args))
module.exports = router
