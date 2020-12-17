const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sectionTag = new Schema({
  name: String,
  slug: {
    type: String,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = sectionTag