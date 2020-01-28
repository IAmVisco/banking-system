const path = require('path')
const http = require('http')
const reload = require('reload')
const express = require('express')
const nunjucks = require('nunjucks')
const bodyParser = require('body-parser')

require('./config/database')
const userRoutes = require('./routes/users')

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
})

app.get('/', (req, res) => {
  res.render('index.njk')
})

app.use('/users', userRoutes)

const server = http.createServer(app)

reload(app).then(() => {
  server.listen(port, () => {
    console.log(`Listening on port ${port}! http://localhost:${port}`)
  })
}).catch((err) => {
  console.error('Reload could not start, could not start server app', err)
})
