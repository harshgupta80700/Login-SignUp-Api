const { json } = require('express')
const express =  require('express')
const router = new express.Router
const controller =  require('../controllers/userController')
const User = require('../models/user')

router.get('/testUser',(req,res)=>{
    res.send("This is a test route")
})

router.post('/addUser',async (req,res)=>{
    const user =  new User(req.body)
    console.log(user)
    try{
        const user =  await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        if(!user){
            throw Error()
        }
        res.status(201).json({
            status: "Success",
            data: user
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            status: "Error",
        })
    }
})




module.exports = router