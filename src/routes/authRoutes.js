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
    check('email',"Please enter a valid email").trim().isEmail(),
    check('password',"Please enter a valid password").trim().isLength({min:10}),
    check('name').trim()
], authMiddleWares.checkValidators,Authcontroller.createUser)


//Login Route
router.post('/login',[
    check('email',"Please enter a valid email").trim().isEmail(),
    check('password',"Please enter a valid password").trim().isLength({min:10})
],authMiddleWares.checkValidators, Authcontroller.login)


//checks token
router.get('/me',authMiddleWares.checkToken,Authcontroller.getUserObject)




module.exports = router