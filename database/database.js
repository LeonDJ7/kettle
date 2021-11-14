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

        let body = req.body;
        let type = body.type;
        let editType = body.data.type;
        let editData = body.data.data;

        if (type === 'database_add') {
            
            if (editType === 'comment_add') {

                /* in editData is 
                {
                    userID,
                    text
                }
                */

                // upload to database given editData
                
            }

        }

        res.send('OK')

    } catch (err) { res.status(500).send(err) }

})

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})