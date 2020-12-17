const Router = require('express').Router
const router = new Router()

const adminUser = require('./model/adminUser/router')
const authAdmin = require('./model/authAdmin/router')
const auth = require('./model/auth/router')
const category = require('./model/category/router')
const user = require('./model/user/router')
const order = require('./model/order/router')
const noty = require('./model/noty/router')
const product = require('./model/product/router')
const upload = require('./model/upload/router')
const settings = require('./model/settings/router')
const page = require('./model/page/router')
const widget = require('./model/widget/router')
const promocode = require('./model/promocode/router')
const search = require('./model/search/router')
const blogPost = require('./model/blogPost/router')
const sectionTag = require('./model/sectionTag/router')
const region = require('./model/region/router')
const productLabel = require('./model/productLabel/router')
const attribute = require('./model/attribute/router')
const attributeValue = require('./model/attributeValue/router')
const payment = require('./model/payment/router')
const form = require('./model/form/router')
const pageTemplate = require('./model/pageTemplate/router')
const section = require('./model/section/router')
const sectionPost = require('./model/sectionPost/router')

router.route('/').get((req, res) => {
  res.json({
    message: 'LootChampion API!'
  })
})
router.use('/search', search)
router.use('/section', section)
router.use('/section-post', sectionPost)
router.use('/form', form)
router.use('/payment', payment)
router.use('/upload', upload)
router.use('/page-template', pageTemplate)
router.use('/widget', widget)
router.use('/region', region)
router.use('/blog-post', blogPost)
router.use('/section-tag', sectionTag)
router.use('/product-label', productLabel)
router.use('/attribute-value', attributeValue)
router.use('/attribute', attribute)

router.use('/promocode', promocode)

router.use('/admin-user', adminUser)

router.use('/auth-admin', authAdmin)

router.use('/auth', auth)
router.use('/noty', noty)

router.use('/settings', settings)

router.use('/page', page)

router.use('/category', category)

router.use('/user', user)
router.use('/order', order)
router.use('/product', product)

module.exports = router