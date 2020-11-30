const express =  require('express')
const router = express.Router()
const Authcontroller =  require('../controllers/authController')
const authMiddleWares = require('../middlewares/authMiddleWares')
const {check} = require('express-validator')

router.get('/testUser',(req,res)=>{
    res.send("This is a test route")
})

router.post('/addUser',[
    check('email').trim().isEmail(),
    check('password').trim().isLength({min:10}),
    check('name').trim()
], authMiddleWares.checkValidators,authMiddleWares.checkSignUpEmail, Authcontroller.createUser)

router.delete('/deleteAll', Authcontroller.deleteAllUsers)

router.get('/getAllUsers', Authcontroller.getAllUsers)

router.post('/login',[
    check('email').trim().isEmail(),
    check('password').trim().isLength({min:10})
],authMiddleWares.checkValidators,authMiddleWares.checkLoginEmail, Authcontroller.login)




module.exports = router