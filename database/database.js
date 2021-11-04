// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.DATABASE_PORT || 4005

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

app.post('/api/events', (req, res) => {

    // push stuff to database depending on type

    try {

        console.log('event: ', req.body);
        res.status(200).json(req.body);

    } catch (err) { res.status(500).send(err) }

})

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})