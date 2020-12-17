const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image')
const pageSchema = new Schema({
  name: String,
  short_name: String,
  
  slug: String,
  seo: {
    title: '',
    description: '',
    keywords: ''
},
  image: {
    type: Image,
    default: () => ({})
  },
  content: [
    {
      anchor: String,
      text: String
    }
  ],
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "PostTag"
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = pageSchema