// dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const path = require('path')
const express = require('express')
const cors = require('cors')
const methodOverride = require('method-override')
const passport = require('./config/passport')
const routes = require('./routes')
require('./connection/mongoose')

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
  origin: 'https://weitungstyle.github.io',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// app.use(cors())

// body-parser
app.use(express.urlencoded({ extended: true }))
// tojson(api)
app.use(express.json())

// passport
app.use(passport.initialize())

// method-override
app.use(methodOverride('_method'))
// multer
app.use('/upload', express.static(path.join(__dirname, 'upload')))

// routes
app.use('/api', routes)

app.listen(port, () => {
  console.info(`Citrus.com server is listening on port ${port}!`)
})

module.exports = app
