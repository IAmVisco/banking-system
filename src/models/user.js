const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  middle_name: { type: String, required: true, trim: true },
  full_name: { type: String, required: true, trim: true, unique: true },
  birth_date: { type: Date, required: true },
  passport_series: { type: String, required: true },
  passport_number: { type: String, required: true, validate: (val) => val.length === 7 },
  passport_full: { type: String, unique: true },
  passport_issuer: { type: String, required: true },
  passport_issue_date: { type: Date, required: true },
  id_number: { type: String, unique: true, required: true, validate: (val) => val.length === 14 },
  birth_place: { type: String, required: true },
  current_city: { type: Schema.Types.ObjectId, ref: 'City' },
  current_address: { type: String, required: true },
  mobile_phone: { type: String },
  email: { type: String },
  work_place: { type: String },
  occupation: { type: String },
  registered_city: { type: Schema.Types.ObjectId, ref: 'City' },
  martial_status: { type: Schema.Types.ObjectId, ref: 'MartialStatus' },
  citizenship: { type: Schema.Types.ObjectId, ref: 'Country' },
  disability: { type: Schema.Types.ObjectId, ref: 'Disability' },
  retired: { type: Boolean, required: true },
  monthly_income: { type: Number }
})

module.exports = mongoose.model('User', UserSchema)
