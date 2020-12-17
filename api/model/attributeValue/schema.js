const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attributeValueSchema = new Schema({
  name: String,
  slug: String,
  attributeId: {
    index: true,
    type: Schema.Types.ObjectId,
    ref: "Attribute"
  }
})

// attributeValueSchema.pre('remove', function())
module.exports = attributeValueSchema
