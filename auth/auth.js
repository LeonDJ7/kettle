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

axios.create({baseURL: `https://auth:${port}`})

app.post('/api/auth/sign_up', async (req, res) => {
    const email = req.body.email
    const pass = req.body.pass

    if(email === undefined || pass === undefined) res.status(400).end()
    else if(!validEmail(email)) res.status(400).send({message: 'invalid-email'})
    else if(pass === '') res.status(400).send({message: 'invalid-password'})
    else {
        //send to database microservice
        try {
            const response = await axios.post('http://auth-db:4008/api/auth/sign_up', {
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
            const response = await axios.get(`http://auth-db:4008/api/auth/log_in?email=${email}&pass=${pass}`)

            res.status(response.status).send(response.data)
        }
        catch (error) {
            if(error.response) res.status(error.response.status).send(error.response.data)
            else res.status(500).send({message: 'error-processing-request'})
        }

    }
})

//event bus
app.post('/api/events', async (req, res) => {
    const type = req.body.type
    const data = req.body.data

    if(type === "user_signup") {
        try {
            const response = await axios.post(`http://auth:${port}/api/auth/sign_up`, {
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
            const response = await axios.get(`http://auth:${port}/api/auth/log_in?email=${data.email}&pass=${data.pass}`)

            res.status(response.status).send(response.data)
        }
        catch (error) {
            if(error.response) res.status(error.response.status).send(error.response.data)
            else res.status(500).send({message: 'error-processing-request'})
        }
    }
    else res.end()
})


app.listen(port, () => {
    console.log(`server listening on the port::${port}`)
})
