const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image')
const pageSchema = new Schema({
  name: String,
  slug: String,
  values: {},
  template: {
    ref: "PageTemplate",
    type: Schema.Types.ObjectId
  },
  seo: {
    title: '',
    description: '',
    keywords: ''
  },

  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = pageSchema