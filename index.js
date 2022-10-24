require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
env.config()
const mongoString = process.env.MONGO_URI;

const userRoute = require('./routes/User')
const employeeRoute = require('./routes/Employees')

const app = express()
app.use(express.json())
const port = 3060;

app.use('/api', userRoute);
app.use("/api", employeeRoute);

app.get('/api', (req, res) => {
    res.send("Welcome to the home page!");
})



app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})