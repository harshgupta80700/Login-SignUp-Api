const express =  require('express');
const router = express.Router();
const Authcontroller =  require('../controllers/auth_controller');
const authMiddleWares = require('../middlewares/auth_middleware');
const {check} = require('express-validator');
const validators = require('../validators/check_validators');

router.get('/testUser',(req,res)=>{
    res.send("This is a test route");
});


//Sign Up Route
router.post('/addUser',[
    check('email',"Please enter a valid email").trim().isEmail(),
    check('password',"Please enter a valid password").trim().isLength({min:10}),
    check('name').trim()
], validators.checkValidators,Authcontroller.createUser);


//Login Route
router.post('/login',[
    check('email',"Please enter a valid email").trim().isEmail(),
    check('password',"Please enter a valid password").trim().isLength({min:10})
],validators.checkValidators, Authcontroller.login);


//checks token
router.get('/me',authMiddleWares.protect,Authcontroller.getUserObject);




module.exports = router;