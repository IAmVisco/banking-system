const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  middle_name: { type: String, required: true, trim: true },
  birth_date: { type: Date, required: true },
  passport_series: { type: String, required: true },
  passport_number: { type: String, required: true },
  passport_issuer: { type: String, required: true },
  passport_issue_date: { type: Date, required: true },
  id_number: { type: String, required: true },
  birth_place: { type: String, required: true },
  current_city: { type: Schema.Types.ObjectId, ref: 'City' },
  current_address: { type: String, required: true },
  registered_city: { type: String, required: true },
  martial_status: { type: Schema.Types.ObjectId, ref: 'MartialStatus' },
  citizenship: { type: Schema.Types.ObjectId, ref: 'Сitizenship' },
  disability: { type: Schema.Types.ObjectId, ref: 'Disability' },
  retired: { type: Boolean, required: true }
})

module.exports = mongoose.model('User', UserSchema)
