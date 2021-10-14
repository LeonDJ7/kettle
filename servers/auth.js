// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')


const app = express()
const port = process.env.AUTH_PORT || 4000


app.use(cors())
app.use(express.json())

app.get('/api/auth/sign_up', (req, res) => {

})

app.get('/api/auth/log_in', (req, res) => {
    
})

app.get('/api/auth/log_out', (req, res) => {
    
})

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})