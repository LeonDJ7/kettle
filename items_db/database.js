// // npm packages
// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')

// const app = express()
// const port = process.env.DATABASE_PORT || 4005

// app.use(express.urlencoded({ extended: true }))
// app.use(cors())
// app.use(express.json())

// data: {
//   imageURL: imageURL,
//   name: name, 
//   description: description, 
//   creator: creator,
//   yearCreated: yearCreated,
//   comments: [],
//   tags: []
// }

const testItem = {
  id: 13451623,
  name: "Sam", 
  //imageURL: "fake.com", 
  description: "A cool, smart, funny, genius, wow, lots of jokes for every occasion and a smile and a frown.",
  creator: 12312973,
  yearCreated: 1998,
  comments: '[]',
  tags: '[]'
};

const testTag = '{"tag": "strange", "userID": 0123176253}'
const testComment = '{ "text": "i like this enough to see this again" }'

// data: {
//   text: text,
//   itemID: itemID,
//   userID: userID
// }

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'samsam98',
  database: 'itemsdb'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  // connection.query('INSERT INTO items SET ?', testItem, (err, res) => {
  //   if (err) throw err;
  //   console.log('Last insert ID: ', res.insertId);
  // });
  // trying to append a tag.
  // connection.query("UPDATE items SET tags = JSON_ARRAY_APPEND(tags , '$', ?) WHERE ID = ?",
  //                 [testTag, testItem.id],
  //                 (err, result) => {
  //                   if (err) throw err;
  //                 }
  // )
  // connection.query("UPDATE items SET comments = JSON_ARRAY_APPEND(comments , '$', ?) WHERE ID = ?",
  //                 [testComment, testItem.id],
  //   (err, result) => {
  //     if (err) throw err;
  //   }
  // )
  // connection.query()

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