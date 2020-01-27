const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DisabilitySchema = new Schema({
  name: { type: String, required: true, trim: true }
})

module.exports = mongoose.model('Disability', DisabilitySchema)
