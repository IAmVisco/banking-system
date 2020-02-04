const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CurrencySchema = new Schema({
  name: { type: String, required: true, trim: true },
  short_name: { type: String, required: true, trim: true },
  symbol: { type: String, required: true, trim: true }
})

module.exports = mongoose.model('Currency', CurrencySchema)
