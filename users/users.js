// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.USER_PORT || 4003

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

app.post('api/users/favorite_item', (req, res) => {
    if (users.hasOwnProperty(req.body.username)) {
        let favorites = users[req.body.username].favorites;
        // for (let i = 0; i < favorites.length; i++) {
        //     if (req.body.item_id === favorites[i]) {
        //         res.status(404).send(users);
        //     }
        // }
        if (favorites.includes(req.body.item_id)) {
            users[req.body.username].favorites.push(req.body.item_id);
            res.status(200).send(users);
        } else {
            res.status(404).end();
        }
    } else {
        res.status(404).end();
    }
})

app.post('api/users/unfavorite_item', (req, res) => {
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
})

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})