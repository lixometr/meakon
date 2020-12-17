const unitpay = require('./unitpay')
const payop = require('./payop')

async function generatePaymentLink(type, params) {
    if (type === 'unitpay') {
        return unitpay.generateLink(params)

    } else {
        return await payop.generateLink(params)

    }
}

module.exports = {
    generatePaymentLink
}