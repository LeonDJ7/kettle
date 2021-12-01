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
// top_tags : from discover


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
    console.log("New event...")
    const { type, data } = req.body;
    const event = req.body;
    console.log(type)
    console.log(data)

    // for items:
    // item_add, comment_moderate, tag_moderate, get_item 
    // new_item, new_comment, new_tag

    try {
        const event = req.body;

        if (type === 'get_item' || type === 'get_all_items') {
            const response = await axios.post(`http://localhost:${ports.items_db}/api/events`, event).catch((er) => {
                console.log(err.message);
            });
            console.log(await response.data)
            res.status(201).json(await response.data);
        } 

        if (event.type === 'user_add') {
            
            const response = axios.post(`http://localhost:${ports.users}/api/events`, event).catch((er) => {
                console.log(err);
            });

            res.status(201).json(await response.json());

        }

        if(event.type === "user_login") {
            
            const response = await axios.post(`http://localhost:${ports.auth}/api/events`, event).catch((err) => {
                console.log(err)
            })
            res.status(response.status).json(response.data)
            
        }
    
        if (event.type === "comment_moderate") {
            const response = await axios.post(`http://localhost:${ports.moderation}/api/events`, event).catch((err) => {
                console.log(err);
            });
            res.json(await response.json());
        }

        if (event.type === "comment_vote") {
            const response = await axios.post(`http://localhost:${ports.items_db}/api/events`, event).catch((err) => {
                console.log(err);
            });
            res.json(await response.json());
        }

        if (event.type === "comment_add") {
            const response = await axios.post(`http://localhost:${ports.items_db}/api/events`, event).catch((err) => {
                console.log(err);
            });
            res.json(await response.json());
        }

        if (event.type === 'tag_moderate') {
            
            await axios.post(`http://localhost:${ports.moderation}/api/events`, event).catch((er) => {
                console.log(err);
            })

        }

        if (event.type === 'tag_vote') {
            
            await axios.post(`http://localhost:${ports.users}/api/events`, event).catch((er) => {
                console.log(err);
            })

        }

        if (event.type === 'tag_add') {
            
            await axios.post(`http://localhost:${ports.items_db}/api/events`, event).catch((er) => {
                console.log(err);
            })

        }

        if(event.type === "top_tags") {
            
            const response = await axios.post(`http://localhost:${ports.items_db}/api/events`, event).catch((err) => {
                console.log(err)
            })
            
            res.status(response.status).json(response.data)
            
        }
        
        res.status(200).json({ status: "OK" });
    }
    catch (err) {
        res.status(400).send(err)
    }

    
    
});

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
});