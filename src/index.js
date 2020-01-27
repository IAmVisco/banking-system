const path = require('path')
const http = require('http')
const reload = require('reload')
const express = require('express')
const nunjucks = require('nunjucks')

const mongoose = require('./config/database')
const userRoutes = require('./routes/users')

const app = express()
const port = process.env.PORT || 3001

mongoose.connection.on('error', (err) => console.error('MongoDB connection error', err))
nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
})

app.use('/users', userRoutes)

const server = http.createServer(app)

reload(app).then(() => {
  server.listen(port, () => {
    console.log(`Listening on port ${port}!`)
  })
}).catch((err) => {
  console.error('Reload could not start, could not start server app', err)
})
