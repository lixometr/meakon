const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const bluebird = require('bluebird')
const cors = require('cors')
const dotenv = require('dotenv').config()

const config = require('./config')
const routes = require('./routes')

const requestMiddleware = require('./middleware/request')
const adminSettings = require('./middleware/adminSettings')
const errorHandler = require('./middleware/errorHandler')
require('./helpers/cron')
require('./helpers/mail')
const app = express()

mongoose.Promise = bluebird

mongoose.connect(config.mongo.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log('connected')
})
  .catch(err => {
    console.log('error while connecting to DB ', err)
  })

app.use(cors())
app.set('trust proxy', true)
app.use((req, res, next) => {
  res.setHeader('X-Robots-Tag', 'noindex, follow')
  next()
})
app.use('/public', express.static('../uploads'));

app.use(helmet())

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(morgan('tiny'))

app.use(adminSettings())
app.use(requestMiddleware())

app.use('/', routes)

app.use('*', (req, res) => {
  res.status(404).json({ code: 404, message: 'Not Found' })
})

app.use(errorHandler())

app.listen(config.server.port, '0.0.0.0', () => {
  console.log(`Server is running on port ${config.server.port}`)
})

module.exports = app
