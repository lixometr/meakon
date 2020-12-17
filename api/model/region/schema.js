const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image')
const regionSchema = new Schema({
  name: String,
  slug: {
    type: String,
    unique: true
  },
  currency: String,
  iso_currency: String
})

module.exports = regionSchema
