const orderEvent = require('../model/order/event')
const userEvent = require('../model/user/event')
const authEvent = require('../model/auth/event')
const paymentEvent = require('../model/payment/event')
const formEvent = require('../model/form/event')
const { sendMail } = require('../services/mail')
const config = require('../config')
orderEvent.on('changeStatus', async (order) => {
    const statuses =
    {
        0: "CANCELLED",
        1: "COMPLETED",
        2: "IN PROGRESS",
        3: "NEW ORDER",
    }
    let status = statuses[order.status]
    const data = {
        status,
        currency: order.region.currency,
        info: order.info,
        order_id: order.order_id,
        created_at: order.created_at,
        products: order.products,
        total_price: order.total_price,
        ...order
    }
    console.log(data)
    await sendMail({
        to: order.info.email,
        subject: `[Loot Champion] Your order #${order.order_id} has received a status update`,
        data,
        template: 'orderUpdate'
    })
    if(process.env.NODE_ENV === 'development') return
    await sendMail({
        to: config.adminEmail,
        subject: `[Loot Champion] Order #${order.order_id} has received a status update`,
        data,
        template: 'orderUpdate'
    })
})

authEvent.on('signup', async ({ email, confirm_link }) => {
    await sendMail({
        to: email,
        subject: `[Loot Champion] Confirm Email`,
        data: {
            confirm_link,

        },
        template: 'signup'
    })
})
authEvent.on('restore', async ({ email, restore_link }) => {
    await sendMail({
        to: email,
        subject: `[Loot Champion] Restore Password`,
        data: {
            restore_link,

        },
        template: 'restore'
    })
})

// paymentEvent.on('newOrder', async ({ email, }) => {
//     await sendMail({
//         to: email,
//         subject: `[Loot Champion] New Order`,
//         data: {
//             restore_link,

//         },
//         template: ''
//     })
// })

formEvent.on('subscribe', async ({ email }) => {
    await sendMail({
        to: config.adminEmail,
        subject: `[Loot Champion] Subscribe User`,
        data: {
            email,
        },
        template: 'adminSubscribe'
    })
})
formEvent.on('contact', async ({ type, name, email, message }) => {
    await sendMail({
        to: config.adminEmail,
        subject: `[Loot Champion] ContactForm`,
        data: {
            email,
            type,
            name,
            email,
            message
        },
        template: 'adminContact'
    })
})