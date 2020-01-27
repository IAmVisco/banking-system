const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CitySchema = new Schema({
  name: { type: String, required: true, trim: true }
})

module.exports = mongoose.model('City', CitySchema)
