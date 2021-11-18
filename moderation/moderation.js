// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const { receiveMessageOnPort } = require('worker_threads')

const app = express()
const port = process.env.USER_PORT || 4004

app.use(cors())
app.use(express.json())


//database: passw


//the purpose of this microservice is to monitor:
//  description - for unrelated, false info NOT DOING THIS YET
//  tags - inappropriate, hateful descriptors
//  comments - inappropriate, hateful comments

//when are these things monitored?
//  when they are created


//the post request either passed_moderation : "OK" || "FAIL"

//let listOfBadWords = ["stupid","fuck"]
let Filter = require('bad-words'),
    filter = new Filter();

// app.post('/moderation/new_tag', (req, res) => {
//     let tag = req.body.tag
//     if(filter.clean(tag) !== tag){
//         res.send({passed_moderation : "FAIL"})
//     } else {
//         res.send({passed_moderation : "OK"})
//     }
// })
//     // if(listOfBadWords.includes(tag.toLowerCase())) {
//     //     res.send({passed_moderation : "FAIL"})
//     // } else {
//     //     res.send({passed_moderation : "OK"})
//     // }

// app.post('/moderation/new_comment', (req, res) => {
//     let comment = req.body.text
//     let bad = false
//     if(filter.clean(comment) !== comment){
//         bad = true
//     }
//     // for(let i = 0; i <listOfBadWords.length; i++) {
//     //     if(comment.toLowerCase().includes(listOfBadWords[i])) {
//     //         bad = true
//     //     }
//     if(bad === true){
//         res.send({passed_moderation : "FAIL"})
//     } else {
//         res.send({passed_moderation : "OK"})
//     }
// })



app.post('/api/events', (req, res) => {
    try {
        let body = req.body; //does this need to be here ??
        let type = body.type;
        let data = body.data;

        if (type === 'comment_moderate') {
            // moderate make sure comment is chill
            let comment = data.text
            let bad = false
            if(filter.clean(comment) !== comment) { bad = true }
            if(bad === false) { 
                //comment is chill
                const response = await axios.post('http://localhost:4006/events', {
                    type: 'commend_add',
                    data: { data: data }
                })
                let data = await response.json()
            }
            else {
                //comment isn't chill
                //send to commentgraveyard
            }
        }
        else if (type === 'tag_moderate') {
            //moderate to make sure tag is chill
            let tag = data.tag
            let bad = false
            if(filter.clean(tag) !== tag) { bad = true }
            if(bad === false) {
                //tag is chill
                const response = await axios.post('http://localhost:4006/events', {
                    type: 'tag_add',
                    data: { data: data }
                })
                let data = await response.json()
            }
            else {
                //tag isn't chill
                //send to taggraveyard 
            }
        }
    } catch (err) { res.status(500).send(err) }
})



app.get('/hello', (req, res) => {
    res.send("hello world")
})


app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})

//some questions:
// -in order for this to work does items.js need to be using 
//   the same port for adding new_comment and new_tag?
// -is this really a microservice if it's interacting with 
//   another microservice? this relies on items.js to function
// -there is a comma in the axios.post call in items.js that
//   shouldn't be there
// -should i be sending status codes? 