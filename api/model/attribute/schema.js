const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AttributeSchema = new Schema({
  name: String,
  name_en: String,
  slug: String,

  created_at: {
    type: Date,
    default: Date.now
  }
})

AttributeSchema.methods.translate = function () {
  
}

module.exports = AttributeSchema
