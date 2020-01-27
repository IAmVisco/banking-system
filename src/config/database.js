const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on('error', (err) => console.error('MongoDB connection error', err))

module.exports = mongoose
