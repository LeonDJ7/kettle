// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.USERS_PORT || 4003

app.use(express.urlencoded())
app.use(cors())
app.use(express.json())

// let users = {
// 	"testuser0": {
// 		id: 0,
// 		favorites: [],
// 		tags: []
// 	},
// 	"testuser1": {
// 		id: 1,
// 		favorites: [],
// 		tags: []
// 	}
// }

app.get('/api/users/favorites', async (req, res) => {
	let userID = String(req.query.userID);
	const response = await axios.post('http://event-bus:4003/events', {
		type: 'favorite_get',
		data: {
			userID: userID
		}
	})
	const r = await response.data
	console.log(await r)
	res.send(await r[0])
})

app.post('/api/users/favorite_item', async (req, res) => {
	console.log(req.body);
	let userID = req.body.userID;
	let itemID = req.body.item_id;
	if (userID === undefined || itemID === undefined) {
		res.status(400).end()
	} else {
		const response = await axios.post('http://event-bus:4003/events', {
			type: 'favorite_add',
			data: {
				userID: userID,
				itemID: itemID,
			}
		})
		const data = await JSON.parse(response.config.data);
		res.status(200).end();		
	}
})

app.post('/api/users/unfavorite_item', async (req, res) => {
	if (req.body.username === undefined || req.body.item_id === undefined) {
		res.status(400).end();
	} else {
		const response = await axios.post('http://event-bus:4003/events', {
			type: 'favorite_remove',
			data: {
				userID: userID,
				itemID: itemID,
			}
		})
		const data = await JSON.parse(response.config.data);
		res.status(200).end();
	}
})


if (process.platform === "win32") {
	var rl = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout
	});
  
	rl.on("SIGINT", function () {
		process.emit("SIGINT");
	});
}
  
process.on("SIGINT", async function () {
	process.exit();
});

app.listen(port, () => {
	console.log(`server listening on the port::${port}`)
})