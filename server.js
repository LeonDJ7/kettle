
// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

//routers
import discoverRouter from './routers/discoverRouter'
import authRouter from './routers/authRouter'
import reviewRouter from './routers/reviewRouter'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/discover', discoverRouter)
app.use('/api/review', reviewRouter)

// serve static files from the react frontend
app.use(express.static(path.join(__dirname, 'client/build')))

// anything that doesn't match the above, send back index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})