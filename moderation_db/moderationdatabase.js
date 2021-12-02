//npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
const port = 4007

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())


const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'passw',
  database: 'moderation_db'
})

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!')
})


//get TAG or COMMENT data from event bus and store bad tags/comments to graveyard 
app.post("/api/events"), (req, res) => {
  const { type, data } = req.body
  //there is no way this works
  //how do insert records into tables using the itemsID and data.tag from the 
  //var inserttag = "INSERT INTO taggraveyard (userid, tag) VALUES (itemID, data.tag)"
  //var insertcomment = "INSERT INTO commentgraveyard (userid, comment) VALUES (itemID, data.tag)"
  

  if (type === 'comment_graveyard'){
    connection.query('INSERT INTO commentgraveyard (userid, tag) VALUES (?, ?)', [itemID, data.tag], function(err, result) {
      if (err) throw err
      console.log("1 record inserted into the commentgraveyard")
    })
  }

  if (type === 'tag_graveyard'){
    connection.query(inserttag, function(err, result) {
      if (err) throw err
      console.log("1 record inserted into the taggraveyard")
  })
  }
}

// running eventbus, itemsdb, items, moderation 




