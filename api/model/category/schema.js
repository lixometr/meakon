const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image');
// 5 картинок
const categorySchema = new Schema({
  name: String,
  name_en: String,
  image: {
    type: Image,
    default: () => ({})
  },

  slug: {
    type: String,
    index: true,
  },
  filter_attributes: [
    {
      ref: "Attribute",
      type: Schema.Types.ObjectId
    }
  ],
  show_filter_price: {
    type: Boolean,
    default: false
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    index: true,
    default: () => null
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
}, { minimize: false })


module.exports = categorySchema
