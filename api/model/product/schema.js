const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Image = require('../Image');
const File = require('../File');
const RegionPrice = require('../RegionPrice')
const ProductOptionValue = new Schema({
  name: String,
  price: [RegionPrice],
  settings: {}
})
const RegionDate = {
  value: Date,
  region: {
    ref: "Region",
    type: Schema.Types.ObjectId
  }
}
const DateItem = new Schema({
  date: [
    RegionDate
  ],
  team: String,
  cnt: {
    type: Number,
    default: 0
  },
  booked_cnt: {
    type: Number,
    default: 0
  },
  sale: {
    type: Number,
    default: 0
  }
})
const ProductOption = new Schema({
  name: String,
  description: String,
  type: String,
  settings: {},
  values: [
    ProductOptionValue
  ]
})
const ProductVariation = new Schema({
  attr: {
    type: Schema.Types.ObjectId,
    ref: "Attribute"
  },
  // select, tabs
  // attrType: String,
  attrValue: {
    type: Schema.Types.ObjectId,
    ref: "AttributeValue"
  },
  price: [RegionPrice],
  old_price: [RegionPrice],
  cnt: {
    type: Number,
    default: 0
  },
  cnt_booked: {
    type: Number,
    default: 0
  },
  cnt_border: {
    type: Number,
    default: 2
  },
  sku: String,
  product_options: [ProductOption],


  size: {
    weight: String,
    height: String,
    width: String,
    length: String
  }
})
const ProductSchema = new Schema({
  name: String,
  slug: {
    type: String,
    unique: true,
    index: true,
  },
  is_published: {
    type: Boolean,
    default: true
  },
  is_bonus: {
    type: Boolean,
    default: false
  },
  // uncommon rare epic legendary
  bonus_type: {
    type: String
  },
  // status: Number,
  description: [
    {
      title: String,
      content: String
    }
  ],
  flags: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductLabel"
    }
  ],
  default_image: {
    type: Image,
    default: () => ({})
  },
  images: [
    Image
  ],
  attributes: [
    {
      name: {
        ref: "Attribute",
        type: Schema.Types.ObjectId
      },
      show: {
        type: Boolean,
        default: true
      },
      value: [
        {
          ref: "AttributeValue",
          type: Schema.Types.ObjectId
        },
      ]
    }
  ],
  // simple, variation
  product_type: {
    type: String,
    default: 'simple'
  },
  date: {
    type: [DateItem],
    default: () => []
  },
  // Модификации продукта (одинаковые продукты, но с разными атрибутами)
  product_variations: [
    ProductVariation
  ],
  price: [RegionPrice],
  old_price: [RegionPrice],
  cnt: Number,
  cnt_border: {
    type: Number,
    default: 2
  },
  booked_cnt: {
    type: Number,
    default: 0
  },
  sku: String,
  sort_order: {
    type: Number,
    default: 0
  },

  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category"
    }
  ],
  product_options: [ProductOption],
  seo: {
    title: String,
    description: String,
    keywords: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },

}, { toJSON: { virtuals: true } })



module.exports = ProductSchema
