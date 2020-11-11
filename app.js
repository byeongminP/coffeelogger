const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const cors = require('cors')

dotenv.config({ path: './config/config.env' })

require('./config/passport')(passport)

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
