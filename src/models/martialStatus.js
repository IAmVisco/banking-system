const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MartialStatusSchema = new Schema({
  name: { type: String, required: true, trim: true }
})

module.exports = mongoose.model('MartialStatus', MartialStatusSchema)
