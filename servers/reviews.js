// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.REVIEW_PORT || 4002

app.use(cors())
app.use(express.json())

app.post('/api/reviews/add_comment', (req, res) => {

})

app.post('/api/reviews/add_tag', (req, res) => {

})

app.post('/api/reviews/new_item', (req, res) => {

})

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})