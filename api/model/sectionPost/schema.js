const mongoose = require('mongoose')
const Schema = mongoose.Schema
const sectionPostSchema = new Schema({
  name: String,
  slug: String,
  section: {
    type: Schema.Types.ObjectId,
    ref: "Section"
  },
  tags: [
    {
      ref: "SectionTag",
      type: Schema.Types.ObjectId
    }
  ],
  values: {},
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

module.exports = sectionPostSchema