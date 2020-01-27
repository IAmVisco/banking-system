const path = require('path')
const express = require('express')
const nunjucks = require('nunjucks')

const mongoose = require('./config/database')

const pagesRoutes = require('./routes/pages')

const app = express()
const port = process.env.PORT || 3001

nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
})
mongoose.connection.on('error', (err) => console.error('MongoDB connection error', err))

app.use('/', pagesRoutes)

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
