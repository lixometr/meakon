const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema({
  order_id: {
    type: String,
    index: true,
    unique: true
  },
  // 0 - failed 1 - completed - 2 - in progress 3 - new order
  status: Number,
  user: {},
  products: [
    {}
  ],
  region: {},
  total_price: Number,
  info: {
    email: String,
    first_name: String,
    last_name: String,
    phone: String,
    country: String,
  },
  additional_info: String,
  promocode: {},
  character: {
    type: {},
    default: () => ({})
  },

  payment_method: String,
  completed_at: {
    type: Date
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = orderSchema
