const mongoose = require('mongoose')
const Schema = mongoose.Schema

const widgetSchema = new Schema({
  name: {
    type: String,
    index: true
  },

  // Разные значения
  values: {
    type: {},
    default: () => ({})
  },

}, { minimize: false })

module.exports = widgetSchema