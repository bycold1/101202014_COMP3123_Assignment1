require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
env.config()
const mongoString = process.env.MONGO_URI;

const userRoute = require('./routes/User')
const employeeRoute = require('./routes/Employees')

mongoose.connect('mongodb+srv://bycold:sabedra123@cluster0.vw1fp6u.mongodb.net/?retryWrites=true&w=majority', ()=> {console.log("DB CONNECTED")});
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