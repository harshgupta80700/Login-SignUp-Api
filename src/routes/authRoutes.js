const express =  require('express')
const router = express.Router()
const Authcontroller =  require('../controllers/authController')
const authMiddleWares = require('../middlewares/authMiddleWares')
const {check} = require('express-validator')

router.get('/testUser',(req,res)=>{
    res.send("This is a test route")
})


//Sign Up Route
router.post('/addUser',[
    check('email').trim().isEmail(),
    check('password').trim().isLength({min:10}),
    check('name').trim()
], authMiddleWares.checkValidators,authMiddleWares.checkSignUpEmail, Authcontroller.createUser)


//Login Route
router.post('/login',[
    check('email').trim().isEmail(),
    check('password').trim().isLength({min:10})
],authMiddleWares.checkValidators,authMiddleWares.checkLoginEmail, Authcontroller.login)


//checks token
router.get('/me',authMiddleWares.checkToken,Authcontroller.getUserObject)




module.exports = router