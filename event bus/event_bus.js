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

// comment_moderate : from items
// tag_moderate : from items
// tag_vote : from items
// comment_vote : from items
// comment_add : from moderation
// tag_add : from moderation
// get_item : from items
// user_add : from auth


let ports = {
    auth: '4000', 
    discover: '4001',
    items: '4002',
    users: '4003',
    moderation: '4004',
    database: '4005',
    items_db: '4007',
    auth_db: '4008'
}

app.post("/api/events", async (req, res) => {
    
    try {
        const event = req.body;

        // item_add, comment_moderate, tag_moderate, get_item <--- needs a response w/ JSON from
        // the db

        if (event.type === 'get_item') {

            const response = await axios.post(`http://localhost:${ports.items_db}/api/events`, event).catch((er) => {
                console.log(err.message);
            });
            res.status(201).json(await response.json());
        
        } 

        if (event.type === 'user_add') {
            
            axios.post(`http://localhost:${ports.users}/api/events`, event).catch((er) => {
                console.log(err.message);
            });

            const response = await axios.post(`http://localhost:${ports.auth_db}/api/events`, event).catch((er) => {
                console.log(err.message);
            });

            res.status(201).json(await response.json());

        }

        if (event.type === 'comment_moderate') {
            
            const response = await axios.post(`http://localhost:${ports.items}/api/events`, event).catch((er) => {
                console.log(err.message);
            });
            res.status(201).json(await response.json());

        }
        
        if (event.type === 'tag_moderate') {
            
            const response = await axios.post(`http://localhost:${ports.items}/api/events`, event).catch((er) => {
                console.log(err.message);
            });
            res.status(201).json(await response.json());

        }

        if (event.type === 'tag_vote') {
            
            const response = await axios.post(`http://localhost:${ports.users}/api/events`, event).catch((er) => {
                console.log(err.message);
            });
            res.status(201).json(await response.json());

        }

        if (event.type === 'comment_vote') {
            
            const response = await axios.post(`http://localhost:${ports.users}/api/events`, event).catch((er) => {
                console.log(err.message);
            });
            res.status(201).json(await response.json());

        }

        if (event.type === 'comment_add') {
            
            const response = await axios.post(`http://localhost:${ports.items_db}/api/events`, event).catch((er) => {
                console.log(err.message);
            });
            res.status(201).json(await response.json());

        }

        if (event.type === 'tag_add') {
            
            const response = await axios.post(`http://localhost:${ports.items_db}/api/events`, event).catch((er) => {
                console.log(err.message);
            });
            res.status(201).json(await response.json());

        }
        
    }
    catch (err) {
        res.status(400).send(err)
    }
    
});

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
});