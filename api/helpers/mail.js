const orderEvent = require('../model/order/event')
const userEvent = require('../model/user/event')
const authEvent = require('../model/auth/event')
const paymentEvent = require('../model/payment/event')
const formEvent = require('../model/form/event')
const { sendMail } = require('../services/mail')
const config = require('../config')


formEvent.on('contact', async ({ type, name, email, phone, message }) => {
    await sendMail({
        to: config.adminEmail,
        subject: `[Meakon] Contact Form`,
        data: {
            email,
            phone,
            type,
            name,
            message,

        },
        template: 'adminContact'
    })
})