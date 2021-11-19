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
            
            axios.post(`http://localhost:${ports.items}/api/events`, event).catch((er) => {
                console.log(err.message);
            });

        }

        if (event.type === "user_login") {

            const data = req.body.data
            try {
                const response = await axios.get(`http://localhost:${ports.auth}/api/auth/log_in?email=${data.email}&pass=${data.pass}`)
                res.status(response.status).send(response.data)
            }
            catch (err) {
                res.status(400).send(err)
            }

        }

        if (event.type === 'tag_vote') {
            
            await axios.post(`http://localhost:${ports.users}/api/events`, event).catch((er) => {
                console.log(err.message);
            })

        }

        axios.post(`http://localhost:${ports.items_db}/api/events`, event).catch((err) => {
            console.log(err.message);
        })
        
        axios.post(`http://localhost:${ports.discover}/api/events`, event).catch((err) => {
            console.log(err.message);
        });
        axios.post(`http://localhost:${ports.items}/api/events`, event).catch((err) => {
            console.log(err.message);
        });
        axios.post(`http://localhost:${ports.users}/api/events`, event).catch((err) => {
            console.log(err.message);
        });
        
        res.send({ status: "OK" });
    }
    catch (err) {
        res.status(400).send(err)
    }

    
    
});

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
});