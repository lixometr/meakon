const unitpay = require('unitpay-api')
const UnitPay = unitpay.default
const config = require('../config')
const Helpers = require('../helpers/paymentHelpers')
const secretKey = config.unitpay.SECRET_KEY
const crypto = require('crypto')
const payment = new UnitPay({
    secretKey,
    // Default domain unitpay.money
    // unitpay.money or unitpay.ru
    domain: 'unitpay.ru'
})


// USD or EUR
function generateLink({ sum, currency, order_id }) {
    currency = currency || 'USD'
    const params = {
        account: order_id,
        currency,
        desc: order_id,
        sum,
        locale: 'en',
        publicKey: config.unitpay.PUBLIC_KEY
    }
    // You can also add any other keys and their values
    // [key: string]: any

    const form = payment.form(params)
    console.log('sending sign', form)
    return form
}
function validateSignature(sign, params, method) {
    const gotSign = getMd5Sign(params, method)
    console.log(gotSign)
    return gotSign === sign

}
function getMd5Sign(params, method) {
    var array = new Array();
    for (var property in Helpers.ksort(params)) {
        if (property != 'signature') {
            array.push(params[property]);
        }
    }
    array.unshift(method)
    const str = array.join('{up}') + '{up}' + secretKey
    console.log(str)
    return crypto.createHmac('sha256', str) .digest('hex');;
}
module.exports = {
    generateLink,
    getSignature: (...args) => payment.getSignature(...args),
    validateSignature,

}