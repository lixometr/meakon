const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegionPrice = new Schema({
    region: {
        ref: "Region",
        type: Schema.Types.ObjectId
    },
    value: Number
})

module.exports = RegionPrice
