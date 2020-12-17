const controller = require('./controller')
const { Router } = require('express')
const router = Router()
const {body} = require('express-validator')
const isAuthAdmin = require('../../middleware/isAuthAdmin')
const isAuth = require('../../middleware/isAuth')
const orderController = require('../order/controller')
router
  .get('/', isAuthAdmin, (...args) => controller.findAll(...args))
router
  .post('/', isAuthAdmin, (...args) => controller.create(...args))


router.put('/change-password', isAuth, (...args) => controller.changePassword(...args))
// router.put('/change-email', isAuth, (...args) => controller.changeEmail(...args))

router.get('/info', isAuth, (...args) => controller.getInfo(...args))
router.put('/info', isAuth, (...args) => controller.updateInfo(...args))


router.post('/remove', isAuth, (...args) => controller.removeYourself(...args))



router.get('/order', isAuth, (...args) => orderController.findByUserId(...args))
router.get('/awards', isAuth, (...args) => controller.findAwards(...args))
router.get('/available-awards', isAuth, (...args) => controller.findAvailableAwards(...args))
router.post('/choose-award', isAuth, (...args) => controller.chooseAward(...args))

router.get('/search/:text',isAuthAdmin,  (...args) => controller.search(...args))
router.get('/search/', isAuthAdmin, (...args) => controller.search(...args))

router.get('/admin/id/:id', isAuthAdmin, (...args) => controller.findById(...args))

router.route('/id/:id')
  .put(isAuthAdmin, (...args) => controller.updateById(...args))
  .get(isAuthAdmin, (...args) => controller.findById(...args))
  .delete(isAuthAdmin, (...args) => controller.removeById(...args))


module.exports = router
