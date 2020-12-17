const cron = require('node-cron')
const EventEmitter = require('events');
const emiter = new EventEmitter()

cron.schedule('0 0 18 * * 2', () => {
    console.log('here i am');
    emiter.emit('newWeek')
});
// cron.schedule('0 0 0 * * *', () => {
//     console.log('here i am');
//     emiter.emit('newWeek')
// });
// setTimeout(() => {
//     emiter.emit('newWeek')

// }, 300)
module.exports = emiter