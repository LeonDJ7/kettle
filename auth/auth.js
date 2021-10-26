// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const port = process.env.AUTH_PORT || 4000


app.use(cors())
app.use(express.json())

const users = {
    "johndoe" : {password: "123456", sessionId: null},
    "person" : {password: "abcde", sessionId: null}
}

app.post('/api/auth/sign_up', async (req, res) => {
    const username = req.body.user
    const password = req.body.password

    if(username === undefined || password === undefined) res.status(400).end()

    if(users.hasOwnProperty(username)){
        res.status(403).send({message: 'user-already-exists'})
    }

    //skeleton for future async functionality 
    try {
        users[username] = {
            password, 
            sessionId: null
        }
        res.status(201).send({message: 'user-created'})
    }
    catch(err) {
        res.status(500).send({message: 'error-processing-request'})
    }
})

app.get('/api/auth/log_in', (req, res) => {
    const username = req.query.user
    const password = req.query.password

    if(username === undefined || password === undefined) res.status(400).end()

    if(!users.hasOwnProperty(username)) {
        res.status(404).send({message: 'user-not-found'})
    }
    else if(password === users[username].password) {
        users[username].sessionId = Math.random()
        res.status(200).send({message: 'login-successful'})
    }
    else {
        res.status(403).send({message: 'incorrect-password'})
    }
})

app.get('/api/auth/log_out', (req, res) => {
    const username = req.query.user

    if(username === undefined) res.status(400).end()

    if(!users.hasOwnProperty(username)) {
        res.status(404).send({message: 'user-not-found'})
    }
    else {
        users[username].sessionId = null
        res.status(200).send({message: 'logged-out'})
    }
})

app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})