const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CitizenshipSchema = new Schema({
  name: { type: String, required: true, trim: true }
})

module.exports = mongoose.model('Country', CitizenshipSchema)
