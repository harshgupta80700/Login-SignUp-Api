const {validationResult} =  require('express-validator');
const User = require('../models/user')
const jwt = require('jsonwebtoken');


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


const checkToken = async(req,res,next)=>{
    try{
        if(!req.headers.authorization){
            throw Error("Token not Found!")
        }
        const token = req.headers.authorization.split(' ')[1];
        const isVerified = await jwt.verify(token,process.env.SECRET_KEY);
        if(!isVerified){
            throw Error("Invalid Token")
        }
        req.authData = {email:isVerified.email};
        next();
    }catch(e){
        res.status(404).json({
            status: "Error",
            message: e.message,
        })
        return;
    }
}

module.exports = {checkValidators,checkLoginEmail,checkSignUpEmail,checkToken}