
const _ = require('lodash')
const nodemailer = require("nodemailer");
const config = require('../config')
/**
 * 
 * @param {Object} options 
 *  {
 *      // Id шаблона письма
 *      template: '',
 *      to: '',
 *      subject: '',
 *      // Информация для шаблона
 *      data: {}
 *  }
 */
let transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: config.mail.login, // generated ethereal user
        pass: config.mail.password, // generated ethereal password
    },
});
async function sendMail(options) {
    const templateId = options.template
    const data = options.data || {}
    const template = getMail(templateId, data)
    const subject = options.subject
    const from = options.form
    const to = options.to
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: from || 'no-reply@lootchampion.com', // sender address
        to, // list of receivers
        subject: subject, // Subject line
        html: template, // html body
    });
    console.log(info)
}

function defineMail(templateId) {
    return require('../mails/' + templateId)
}

function getMail(templateId, data) {
    const mailTemplate = defineMail(templateId)
    const compile = _.template(mailTemplate)
    return compile(data)
}
module.exports = { sendMail }