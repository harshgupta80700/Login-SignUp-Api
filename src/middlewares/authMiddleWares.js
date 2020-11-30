const {validationResult} =  require('express-validator');
const User = require('../models/user')


const checkValidators = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            status: "Error",
            message: "Wrong Credentials"
        })
        return;
    }
    next();
    
}


const checkSignUpEmail = async(req,res,next) =>{
    const user = await User.findOne({email: req.body.email})
    if(user !== null){
        console.log("inside email exist validation");
        res.status(400).json({
            status: "Error",
            message: "Email Already Exist"
        })
        return;
    }
    console.log("next called")
    next();
}

const checkLoginEmail = async(req,res,next) =>{
    const user = await User.findOne({email: req.body.email})
    if(user === null){
        console.log("inside email exist validation");
        res.status(400).json({
            status: "Error",
            message: "User not found"
        })
        return;
    }
    console.log("next called")
    next();
}

module.exports = {checkValidators,checkLoginEmail,checkSignUpEmail}