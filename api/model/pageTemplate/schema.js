const mongoose = require('mongoose')
const Schema = mongoose.Schema
const field = new Schema({
  name: String,
  var_name: String,
  type: String,
  required: {
    type: Boolean,
    default: false
  },
  comment: String,
  settings: {}
})
const pageSchema = new Schema({
  name: String,
  slug: String,

  fields: [
    field
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = pageSchema