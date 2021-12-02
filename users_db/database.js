require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const port = 4003

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'wail066CAKE',
  database: 'usersdb'
});

// app.post("/api/events", (req, res) => {
//     let { type, data } = req.body;
//     if (type === "favorite_get") {
// 		let 
//     }
// }