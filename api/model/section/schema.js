const mongoose = require('mongoose')
const Schema = mongoose.Schema
const pageSchema = new Schema({
  name: String,
  slug: String,
  template: {
    type: Schema.Types.ObjectId,
    ref: "PageTemplate"
  },
  seo: {
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