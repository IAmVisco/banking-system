const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MartialStatusSchema = new Schema({
  status: { type: String, required: true, trim: true }
})

module.exports = mongoose.model('City', MartialStatusSchema)
