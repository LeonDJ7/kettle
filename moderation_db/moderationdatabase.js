

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
  var inserttag = "INSERT INTO taggraveyard (userid, tag) VALUES ('12345678', 'pussy')"
  var insertcomment = "INSERT INTO commentgraveyard (userid, comment) VALUES ('12345678', 'this song fucking sucks')"
  
  connection.query(inserttag, function(err, result) {
      if (err) throw err
      console.log("1 record inserted into taggraveyard")
  })
  connection.query(insertcomment, function(err, result) {
      if (err) throw err
      console.log("1 record inserted into commentgraveyard")
  })
})
