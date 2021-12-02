const express = require("express");
const axios = require("axios");
const cors = require('cors')

const app = express();
app.use(cors())
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
    moderation_db: '4005',
    // event_bus: 4006,
    items_db: '4007',
    auth_db: '4008',
    client: '4009'
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
            const response = await axios.post(`http://items-db:${ports.items_db}/api/events`, event).catch((er) => {
                console.log(err.message);
            });
            console.log(await response.data)
            res.status(201).json(await response.data);
        } 

        if (event.type === 'user_add') {
            
            const response = axios.post(`http://users:${ports.users}/api/events`, event).catch((er) => {
                console.log(err);
            });

            res.status(201).json(await response.json());

        }

        if(type === "user_signup") {
            try {
                const response = await axios.post(`http://localhost:${ports.auth}/api/events`, event)
    
                res.status(response.status).send(response.data)
            }
            catch (error) {
                if(error.response) res.status(error.response.status).send(error.response.data)
                else res.status(500).send({message: 'error-processing-request'})
            }
        }

        if(event.type === "user_login") {
            const data = req.body.data
            try {
                const response = await axios.get(`http://localhost:${ports.auth}/api/auth/log_in?email=${data.email}&pass=${data.pass}`)
                res.status(response.status).send(response.data)
            }
            catch (error) {
                if(error.response) res.status(error.response.status).send(error.response.data)
                else res.status(500).send({message: 'error-processing-request'})
            }
            
        }
    
        if (event.type === "comment_moderate") {
            const response = await axios.post(`http://moderation:${ports.moderation}/api/events`, event).catch((err) => {
                console.log(err);
            });
            res.json(await response.json());
        }

        if (event.type === "comment_vote") {
            const response = await axios.post(`http://item-db:${ports.items_db}/api/events`, event).catch((err) => {
                console.log(err);
            });
            res.json(await response.json());
        }

        if (event.type === "comment_add") {
            await axios.post(`http://items-db:${ports.items_db}/api/events`, event).catch((err) => {
                console.log(err);
            });
            //res.json(await response.json());
        }

        if (event.type === 'tag_moderate') {
            
            await axios.post(`http://moderation:${ports.moderation}/api/events`, event).catch((er) => {
                console.log(err);
            })

        }

        if (event.type === 'tag_vote') {
            
            await axios.post(`http://users:${ports.users}/api/events`, event).catch((er) => {
                console.log(err);
            })

        }

        if (event.type === 'tag_add') {
            
            await axios.post(`http://items-db:${ports.items_db}/api/events`, event).catch((er) => {
                console.log(err);
            })

        }
        
        //res.status(200).json({ status: "OK" });
    }
    catch (err) {
        res.status(400).send(err)
    }

    
    
});

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
});