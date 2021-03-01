const express = require('express')
const app = express()
const port = 3000   

const router = require('./routes/index.js')

app.set(express.urlencoded({ extended: true }))
app.set(express.json())

app.use('/', router)

app.listen(port, _ => {
    console.log(`app is listening on http://localhost:${port}`)
}) 