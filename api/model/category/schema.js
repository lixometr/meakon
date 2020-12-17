const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image');
// 5 картинок
const categorySchema = new Schema({
  name: String,
  image: {
    type: Image,
    default: () => ({})
  },
  image_person: {
    type: Image,
    default: () => ({})
  },
  image_text: {
    type: Image,
    default: () => ({})
  },
  image_bg: {
    type: Image,
    default: () => ({})
  },
  slug: {
    type: String,
    index: true,
  },
  is_soon: {
    type: Boolean,
    default: false
  },
  soon_color1: String,
  soon_color2: String,
  is_new: {
    type: Boolean,
    default: false
  },
  new_color1: String,
  new_color2: String,
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
  created_at: {
    type: Date,
    default: Date.now
  }
}, { minimize: false })


module.exports = categorySchema
