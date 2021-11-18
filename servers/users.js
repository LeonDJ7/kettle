// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.USER_PORT || 4003

app.use(cors())
app.use(express.json())

app.post('api/users/favorite_item', (req, res) => {

})

app.post('api/users/unfavorite_item', (req, res) => {
    
})

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})