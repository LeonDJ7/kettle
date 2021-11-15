// // npm packages
// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')

// const app = express()
// const port = process.env.DATABASE_PORT || 4005

// app.use(express.urlencoded({ extended: true }))
// app.use(cors())
// app.use(express.json())

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'coxsa',
  password: 'galactic',
  database: 'itemsdb'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});



// app.post('/api/events', (req, res) => {

//     // push stuff to database depending on type

//     try {

//         console.log('event: ', req.body);
//         res.status(200).json(req.body);

//     } catch (err) { res.status(500).send(err) }

// })

// WE NEED EACH MICROSERVICE TO HAVE ITS OWN DB THINGY

// app.post('/api/new_item_to_db', (req, res) => {
//     // post item to db
// })

// app.get('api/get_item', (req, res) => {

// })

// // app.post('/api/tag_to_db', (req, res) => {
// //     // post item to db
// // })

// app.post()

// app.listen(port, () => {
//     console.log(`server listening on the port::${port}`)
// })