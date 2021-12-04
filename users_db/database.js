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

app.post("/api/events", (req, res) => {
	let { type, data } = req.body;
let userID = JSON.stringify(data.userID);
	if (type === "favorite_get") {
		connection.query("SELECT favorites FROM users WHERE userID = ?", userID,
		(err, result) => {
			if (err) {
				res.status(404).end()
			} else {
				console.log(result)
				res.status(201).json(result)
			}
		})
	} else if (type === "favorite_add") {
		let item = parseInt(data.itemID);
	} else if (type === "favorite_remove") {

	}
})