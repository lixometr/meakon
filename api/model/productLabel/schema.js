const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productLabelSchema = new Schema({
  name: String,
  slug: String
})

module.exports = productLabelSchema
