// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const port = 4007

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

//console.log(JSON.stringify({tag: {tag: "great", userID: 0123176253 }, item_id: 56974605}))


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
  imageURL: "fake.com", 
  description: "A cool, smart, funny, genius, wow, lots of jokes for every occasion and a smile and a frown.",
  creator: 12312973,
  yearCreated: 1998,
  comments: '[]',
  tags: '[]'
}

const testTag = '{"tag": "strange", "userID": 0123176253}'
const testComment = '{ "text": "i like this enough to see this again" }'

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'itemsdb',
  user: 'root',
  password: 'samsam98',
  database: 'itemsdb'
})
connection.connect((err) => {
  if (err) throw err
  console.log('Connected!')
})

app.post("/api/events", (req, res) => {
  let { type, data } = req.body
  console.log(data)
  console.log(type)
  // data = JSON.parse(data)
  // get an item
  // console.log("Hey!")
  if (type === "new_item") {
    data[id] = Math.floor(Math.random() * 1000000000)
    connection.query('INSERT INTO items SET ?', newItem, (err, result) => {
      if (err) {
        console.log("Something went wrong. This item couldn't be inserted into the db")
        res.status(400).end()
      }
      console.log('Last insert ID: ', res.insertId)
      //res.end()
    })
  } else if (type === "new_comment") {
    let text = data.text
    let item_id = data.item_id
    let comment = `'{ "text": ${text}}'`
    connection.query("UPDATE items SET comments = JSON_ARRAY_APPEND(comments , '$', ?) WHERE ID = ?",
                    [comment, item_id],
      (err, result) => {
        if (err) {
          res.status(400).end()
        } else {
          res.status(201).end()
        }
      }
    )
  } else if (type === "tag_add") {
    console.log("Making a new tag")
    console.log(data)
    let tag = JSON.stringify(data.tag)
    let item_id = parseInt(data.itemID)
    // let tagJSON = `'{ "tag": ${tag}}'`
    // console.log(tag)
    //console.log(data)
    // connection.query("SELECT * FROM items WHERE ID = ?", item_id, 
    //   (err, result) => {
    //     console.log(result)
    //   })
    connection.query("UPDATE items SET tags = JSON_ARRAY_APPEND(tags , '$', ?) WHERE ID = ?",
                    [tag, item_id],
      (err, result) => {
        if (err) {
          res.status(400).end()
        } else {
          res.status(201).end()
        }
      }
    )
  } else if (type === "get_item") {
    let item_id = data.item_id
    console.log(item_id)
    connection.query("SELECT * FROM items WHERE ID = ?", item_id,
      (err, result) => {
        if (err) {
          res.status(404).end()
        } else {
          console.log(result)
          res.status(201).json(result)
        }
      })
  } else if (type === "get_all_items") { 
    connection.query("SELECT * FROM items",
      (err, result) => {
        if (err) {
          res.status(404).end()
        } else {
          res.status(201).json(result)
        }
      })
  }else {
    res.status(400).end()
  }
})

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})