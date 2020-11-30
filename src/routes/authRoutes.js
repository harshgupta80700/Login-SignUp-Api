const express =  require('express')
const router = express.Router()
const Authcontroller =  require('../controllers/authController')
const User = require('../models/user')

router.get('/testUser',(req,res)=>{
    res.send("This is a test route")
})

router.post('/addUser' , Authcontroller.createUser)

router.delete('/deleteAll', Authcontroller.deleteAllUsers)

router.get('/getAllUsers', Authcontroller.getAllUsers)

router.post('/login', Authcontroller.login)




module.exports = router