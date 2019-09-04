const express = require('express')
const cors = require('cors')
const app = express()
const studentRouter = require('./modules/students/router')

app.use(cors())
app.use(express.json())
app.use('/api/students', studentRouter)

module.exports = app
