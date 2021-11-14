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

let ports = {
    auth: '4000', 
    discover: '4001',
    items: '4002',
    users: '4003',
    moderation: '4004',
    database: '4005'
}

app.post("api/events", (req, res) => {
    const event = req.body;

    axios.post(`http://localhost:${ports.auth}/api/events`, event).catch((err) => {
        console.log(err.message);
    });
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
});

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
});