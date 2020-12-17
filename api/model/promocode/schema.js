const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RegionPrice = require('../RegionPrice')
const promocodeSchema = new Schema({
    name: String,
    value: [RegionPrice],
    // precent, fixed
    sale_type: String,
    // сколько можно использовать
    // -1- infinite
    use_count: Number,
    // сколько можно использовать на юзера
    // -1 - infinite
    use_user_count: Number,
    end_date: Date,
    // сколько раз уже использовали
    use_times: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
}, { minimize: false })

module.exports = promocodeSchema
