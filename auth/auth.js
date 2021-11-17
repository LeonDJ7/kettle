// npm packages
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const validEmail = require('email-format-check')

const app = express()
const port = process.env.AUTH_PORT || 4000


app.use(cors())
app.use(express.json())

const mysql = require('mysql')
const e = require('express')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'galactic',
  database: 'auth'
})

axios.create({baseURL: `https://localhost:${port}`})

connection.connect((err) => {
    if(err){
      console.log('Error connecting to DB')
      return
    }
    console.log('DB Connection established')
})


app.post('/api/auth/sign_up', async (req, res) => {
    const email = req.body.email
    const pass = req.body.pass

    if(email === undefined || pass === undefined) res.status(400).end()
    else if(!validEmail(email)) res.status(400).send({message: 'invalid-email'})
    else if(pass === '') res.status(400).send({message: 'invalid-password'})
    else {
        //send to database microservice
        try {
            const response = await axios.post('http://localhost:4008/api/auth/sign_up', {
                email: email,
                pass: pass
            })

            res.status(response.status).send(response.data)
        }
        catch (error) {
            if(error.response) res.status(error.response.status).send(error.response.data)
            else res.status(500).send({message: 'error-processing-request'})
        }
    }
})


app.get('/api/auth/log_in', async (req, res) => {
    const email = req.query.email
    const pass = req.query.pass

    if(email === undefined || pass === undefined) res.status(400).end()
    else {
        //send to database microservice
        try {
            const response = await axios.get(`http://localhost:4008/api/auth/log_in?email=${email}&pass=${pass}`)

            res.status(response.status).send(response.data)
        }
        catch (error) {
            if(error.response) res.status(error.response.status).send(error.response.data)
            else res.status(500).send({message: 'error-processing-request'})
        }

    }
})


app.get('/api/auth/log_out', (req, res) => {
    const email = req.query.user

    if(email === undefined) res.status(400).end()

    if(!users.hasOwnProperty(email)) {
        res.status(404).send({message: 'user-not-found'})
    }
    else {
        users[email].sessionId = null
        res.status(200).send({message: 'logged-out'})
    }
})

//?????
app.post('/api/events', async (req, res) => {
    const type = req.body.type
    const data = req.body.data

    if(type === "user_signup") {
        try {
            const response = await axios.post(`http://localhost:${port}/api/auth/sign_up`, {
                email: data.email,
                pass: data.pass
            })

            res.status(response.status).send(response.data)
        }
        catch (error) {
            if(error.response) res.status(error.response.status).send(error.response.data)
            else res.status(500).send({message: 'error-processing-request'})
        }
    }
    else if(type == "user_login") {
        try {
            const response = await axios.get(`http://localhost:${port}/api/auth/log_in?email=${email}&pass=${pass}`)

            res.status(response.status).send(response.data)
        }
        catch (error) {
            if(error.response) res.status(error.response.status).send(error.response.data)
            else res.status(500).send({message: 'error-processing-request'})
        }
    }
    else {
        res.status(400).send({message: "bad-format"})
    }
})


app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})

//gives me an err
/* 
connection.end((err) => {
    // The connection is terminated gracefully
    // Ensures all remaining queries are executed
    // Then sends a quit packet to the MySQL server.
})*/