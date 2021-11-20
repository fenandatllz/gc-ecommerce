require('dotenv').config()
const express = require('express')
const session = require('express-session')
const app = express()

// @Routes
const {authR, crmR, booksR } = require('./routes')

// const books = require('./routes/books')
// const crm = require('./routes/crm')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
  	saveUninitialized: true
}))

app.get('/', async (req, res) => {
  res.status(200).send({
    code: 0,
    status: 'ok',
  })
})

app.use('/auth',authR)
app.use('/books', booksR)
app.use('/crm', crmR)

module.exports = app
