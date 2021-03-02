require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000   

const router = require('./routes/index.js')

const errHandler = require('./middlewares/errHandler.js')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', router)
app.use(errHandler)

app.listen(port, _ => {
    console.log(`app is listening on http://localhost:${port}`)
}) 