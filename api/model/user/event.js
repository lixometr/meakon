const cronEvent = require('../../helpers/cron')
const EventEmitter = require('events');
const facade = require('./facade')
const emiter = new EventEmitter
cronEvent.on('newWeek', async () => {
    console.log('user here')
    await facade.giveAwards()
})
module.exports = emiter