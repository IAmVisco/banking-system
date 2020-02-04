const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DepositSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  type: { type: Number, required: true },
  currency: { type: Schema.Types.ObjectId, ref: 'Currency' },
  sum: { type: Number, require: true },
  balance: { type: Number, require: true },
  percent: { type: Number, required: true }

  // maybe some other time
  // start_date: { type: Date, required: true },
  // end_date: { type: Date, required: true },
  // deposit_duration: { type: Number, required: true }, // duration in secs
})

module.exports = mongoose.model('Deposit', DepositSchema)
