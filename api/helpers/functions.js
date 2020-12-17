const _ = require('lodash')
const config = require('../config')
function generateConfirmLink(key) {
    return `${config.appUrl}/confirm/${key}`
}
function generateRestoreLink(key) {
    return `${config.appUrl}/reset/${key}`
}

function getRandom(data, chance) {
    const arrayShuffle = (array) => {
        for (var i = 0, length = array.length, swap = 0, temp = ''; i < length; i++) {
            swap = Math.floor(Math.random() * (i + 1));
            temp = array[swap];
            array[swap] = array[i];
            array[i] = temp;
        }
        return array;
    };

    const percentageChance = (values, chances) => {
        for (var i = 0, pool = []; i < chances.length; i++) {
            for (var i2 = 0; i2 < chances[i]; i2++) {
                pool.push(i);
            }
        }
        return values[arrayShuffle(pool)['0']];
    };
    return percentageChance(data, chance)

}





module.exports = {
    generateConfirmLink,
    generateRestoreLink,
    getRandom
}