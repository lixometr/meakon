const mongoose = require('mongoose')
const Schema = mongoose.Schema
const pageSchema = new Schema({
  text: String,
  link: String,
  date: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = pageSchema