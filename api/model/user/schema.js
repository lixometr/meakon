const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserAward = new Schema({
  product: {},
  category: {},
  // 0 - disabled, 1 - active
  status: {
    type: Number,
    default: 0
  },
  got_at: {
    type: Date,
    default: Date.now
  }
})
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },

  first_name: String,
  last_name: String,
  country: String,
  contact: {
    discord: String,
    skype: String
  },
  character: {
    character_name: String,
    server_name: String,
    battle_tag: String,
    fraction: String,
    armory_link: String,
    region: String
  },
  phone: String,
  confirm_key: String,
  restore_key: String,
  is_confirmed: {
    type: Boolean,
    default: false
  },
  keep_update: {
    type: Boolean,
    default: false
  },
  used_promocodes: {
    type: [
      {
        promocode: {
          type: Schema.Types.ObjectId,
          ref: "Promocode"
        },
        times: {
          type: Number,
          default: 0
        }
      }
    ],
    default: () => []
  },
  coins: {
    type: Number,
    default: 0
  },

  total_coins: {
    type: Number,
    default: 0
  },
  awards: [
    UserAward
  ],
  available_awards: [
    {}
  ],
  // 0 - no, 2 - waiting 1 - available
  award_status: {
    type: Number,
    default: 0
  },

  role: {
    type: String,
    default: 'user'
  },

  created_at: {
    type: Date,
    default: Date.now
  }
})


module.exports = userSchema
