const express = require('express')
const app = express.Router()
const User = require('../model/UserModelFile')




app.post('/user/signup', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const savedUser = await user.save()
        res.status(201).json({
                            message: "User created successfully",
                            statusCode: 201,
                            savedUser: savedUser
                            })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


app.post('/user/login', async (req, res) => {

    const {
        username,
        password
    } = req.body;
    
    const user = await User.findOne({
        username: username
    })
 
    if (user) {
        if (user.password === password) {
            res.status(200).json({
                "status": true,
                message: "Log in successfully",
                username: user.username,
                password: user.password
            })
        } 
    } else {
        res.status(400).json({
            "status": false,
            "message": "Invalid UserName or Password"
        })
    }
})




module.exports = app