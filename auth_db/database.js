// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.AUTH_PORT || 4008


app.use(cors())
app.use(express.json())

const mysql = require('mysql')
const e = require('express')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'galactic',
  database: 'auth'
})

connection.connect((err) => {
    if(err){
      console.log('Error connecting to DB')
      return
    }
    console.log('DB Connection established')
})

app.post('/api/auth/sign_up', async (req, res) => {
  const email = req.body.email
  const pass = req.body.pass
  
  if(email === undefined || pass === undefined) res.status(400).end()
  
  const queryUserExists = `SELECT * FROM users WHERE email = "${email}"`
        
  connection.query(queryUserExists, (err, rows) => {
      if(err) res.status(500).send({message: 'error-processing-request'}) //sql error
      else if(rows && rows.length > 0) res.status(403).send({message: 'user-already-exists'})
      else {
          const insertUser = `INSERT INTO users(id, email, pass) VALUES(NULL, '${email}', '${pass}')`

          connection.query(insertUser, (err, rows) => {
              if(err) res.status(500).send({message: 'sql-error'})    
              else res.status(201).send({message: 'user-created'})
          })
      }
  })
})

app.get('/api/auth/log_in', (req, res) => {
  const email = req.query.email
  const pass = req.query.pass

  if(email === undefined || pass === undefined) res.status(400).end()
  else {
      const queryUser = `SELECT * FROM users WHERE email = "${email}"`
      
      connection.query(queryUser, (err, rows) => {
          if(err) res.status(500).send({message: 'error-processing-request'}) //sql error
          else if(!rows || rows.length === 0 ) res.status(404).send({message: 'user-not-found'})
          else { 
              if(pass === rows[0]["pass"] )res.status(200).send({message: 'login-successful'})
              else res.status(403).send({message: 'incorrect-password'})
          }
      })
  }
})

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})