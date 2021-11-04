const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

let ports = {
    auth: '4000', 
    discover: '4001',
    items: '4002',
    users: '4003',
    moderation: '4004'
}

app.post("api/events", (req, res) => {
  const event = req.body;

  axios.post(`http://localhost:${auth}/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`http://localhost:${discover}/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`http://localhost:${items}/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`http://localhost:${users}/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`http://localhost:${moderation}/events`, event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});