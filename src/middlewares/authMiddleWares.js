const {validationResult} =  require('express-validator');
const jwt = require('jsonwebtoken');


const checkValidators = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            status: "Error",
            errors: errors.array() 
        })
        return;
    }
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
        req.authData = {email:isVerified.email,id:isVerified.id};
        next();
    }catch(e){
        res.status(404).json({
            status: "Error",
            error: e.message,
        })
        return;
    }
}

module.exports = {checkValidators,checkToken}