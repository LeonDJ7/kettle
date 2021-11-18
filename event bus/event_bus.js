const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());
const port = process.env.EVENT_BUS_PORT || 4006

/* structure of event body
{
    type: string,
    data: {}
}
*/

// EVENT TYPES

// comment_moderate : item service sends recieved comment to moderation
// tag_moderate: item service sends recieved tag to moderation
// tag_vote : items ms to users ms
// comment_vote : items ms to users ms
// comment_add : sending comment to item db
// tag_add : sending tag to item db
// item_add : sending item to item db

// user_add : auth sends added user to user ms


// TBD

// database_add : specify where and what is being changed in data object, sent to database ms
// or
// each have their own database

let ports = {
    auth: '4000', 
    discover: '4001',
    items: '4002',
    users: '4003',
    moderation: '4004',
    database: '4005',
    items_db: '4007'
}

app.post("api/events", async (req, res) => {
    
    const { type, data } = req.body;
    const event = req.body;

    // for items:
    // item_add, comment_moderate, tag_moderate, get_item 
    // new_item, new_comment, new_tag


    if (type === 'get_item') {
        const response = await axios.post(`http://localhost:${ports.items_db}/api/events`, event).catch((er) => {
            console.log(err.message);
        });
        res.status(201).send(await response.json());
    
    } else {

        axios.post(`http://localhost:${ports.auth}/api/events`, event).catch((err) => {
            console.log(err.message);
        });

        axios.post(`http://localhost:${ports.items_db}/api/events`, event).catch((er) => {
            console.log(err.message);
        })
        
        axios.post(`http://localhost:${ports.discover}/api/events`, event).catch((err) => {
            console.log(err.message);
        });
        axios.post(`http://localhost:${ports.items}/api/events`, event).catch((err) => {
            console.log(err.message);
        });
        axios.post(`http://localhost:${posts.users}/api/events`, event).catch((err) => {
            console.log(err.message);
        });
        axios.post(`http://localhost:${posts.moderation}/api/events`, event).catch((err) => {
            console.log(err.message);
        });
        res.send({ status: "OK" });
    }   
});

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
});