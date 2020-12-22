const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image')
const pageSchema = new Schema({
  name: String,
  name_en: String,
  slug: String,
  values: {},
  is_published: {
    type: Boolean,
    default: true
  },
  template: {
    ref: "PageTemplate",
    type: Schema.Types.ObjectId
  },
  seo: {
    title: String,
    description: String,
    keywords: String
  },
  seo_en: {
    title: String,
    description: String,
    keywords: String
  },

  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = pageSchema