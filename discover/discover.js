// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const axios = require('axios');
// const stub = require('jstest')

const app = express()
const port = process.env.REVIEW_PORT || 4001

app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())

// example item structures.
const items = {
    "0": {
        imageURL: "https://ychef.files.bbci.co.uk/976x549/p03lcphh.jpg",
        name: "A songname",
        description: "A song",
        creator: "Sam",
        yearCreated: 1900,
        comments: [
            {
                text: 'haha funny comment',
                likes: 2,
                dislikes: 6,
                userID: 1,
                commentID: 0
            }
        ],
        tags: [
            {
                votes: 10,
                tag: 'funny',
                tagID: 0
            },
            {
                votes: 1,
                tag: 'morose',
                tagID: 1
            }
        ]
    },
    "1": {
        imageUrl: "https://i.guim.co.uk/img/media/8a840f693b91fe67d42555b24c6334e9298f4680/0_1476_2429_1456/master/2429.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=aa2c4c7cf002ac04f03012008fbdffa3",
        name: "Scream closer",
        description: "Another painting",
        creator: "Mas",
        yearCreated: 1901,
        comments: [
            {
                text: 'haha funny comment',
                likes: 2,
                dislikes: 6,
                userID: 1,
                commentID: 0
            }
        ],
        tags: [
            {
                votes: 1,
                tag: 'goofy',
                tagID: 0
            }
        ]
    }
}

app.post('/api/discover/top_tags', (req, res) => {

    try {

        // recieve favorites (list of string ids)
        let favorites = req.body.favorites
        console.log(favorites)

        let tags = {}

        favorites.forEach((id) => {
            items[id].tags.forEach((tag) => {
                tags[tag.tag] = tags[tag.tag] ? tags[tag.tag] + tag.votes : tag.votes
            })
        })

        // send request to get tags of favorite songs
        /*
        for (let i = 0; i < favorites.length; i++) {
            axios.get(`api/items/get_item?item_id=${favorites[i]}`, {

            })
                .then((res) => res.json())
                .then((data) => {
                    data.tags.forEach((tag) => {
                        tags[tag.tag] = tags[tag.tag] ? tags[tag.tag] + tag.votes : tag.votes
                    })
                })
                .catch((e) => {
                    console.log(error)
                })
        }
        */

        res.status(200).json(tags)

    }  catch (err) { res.status(500).send(err) }
    
    

})

app.post('/api/discover/recommendations', (req, res) => {
    
    try {

        // recieve tags (list of strings)
        let tags = req.body.tags
        console.log(tags)

        // algorithm for recommendations (to be implemented later)

        res.status(200).json(tags) // for now just send back tags

    } catch (err) { res.status(500).send(err) }

    

})

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})