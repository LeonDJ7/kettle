const express = require('express')
const router = express.Router()

// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.DISCOVER_PORT || 4001

app.use(cors())
app.use(express.json())

app.get('api/discover/recommendations', (req, res) => {

})

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})