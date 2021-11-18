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

let users = {
    "testuser0": {
        id: 0,
        favorites: [],
        tags: []
    },
    "testuser1": {
        id: 1,
        favorites: [],
        tags: []
    }
}

app.get('/api/users/favorites', (req, res) => {
    // if (users.hasOwnProperty(req.query.username)) {
    //     res.status(200).send(users[req.query.username].favorites);
    // } else {
    //     res.status(404).end();
    // }
    let favorites = String(req.query.favorites);
    const response = await axios.post('http://localhost:4003/events', {
        type: 'favorite_get',
        data: {
            favorites: favorites
        }
    })
    .then(function (response) {
        res.status(200).send(await response.json());
    })
})

app.post('/api/users/favorite_item', (req, res) => {
    console.log(req.body);
    let username = req.body.username;
    let itemID = req.body.item_id;
    if (username === undefined || itemID === undefined) {
        res.status(400).end()
    } else {
        // if (users.hasOwnProperty(req.body.username)) {
        //     let favorites = users[req.body.username].favorites;
        //     console.log(favorites);
        //     if (!favorites.includes(req.body.item_id)) {
        //         users[req.body.username].favorites.push(req.body.item_id);
        //         res.status(201).send(users);
        //     } else {
        //         res.status(404).end();
        //     }
        // } else {
        //     res.status(404).end();
        // }
        const response = await axios.post('http://localhost:4003/events', {
        type: 'favorite_add',
        data: {
          username: username,
          itemID: itemID,
        }
      });
    }
})

app.post('/api/users/unfavorite_item', (req, res) => {
    if (req.body.username === undefined || req.body.item_id === undefined) {
        res.status(400).end();
    } else {
        if(users.hasOwnProperty(req.body.username)) {
            let favorites = users[req.body.username].favorites;
            if (!(favorites.includes(req.body.item_id))) {
                res.status(404).end();
            } else {
                for (let i = 0; i < favorites.length; i++) {
                    if (req.body.item_id === favorites[i]) {
                        favorites.splice(i, 1);
                        res.status(200).send(users);
                    }
                }
            }
        } else {
            res.status(404).end();
        }
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