const jwt = require('jsonwebtoken');

const protect = async(req,res,next)=>{
    try{
        if(!req.headers.authorization){
            throw Error("Token not Found!");
        }
        const token = req.headers.authorization.split(' ')[1];
        const isVerified = await jwt.verify(token,process.env.SECRET_KEY);
        if(!isVerified){
            throw Error("Invalid Token");
        }
        req.authData = {email:isVerified.email,id:isVerified.id};
        next();
    }catch(e){
        res.status(401).json({
            status: "Error",
            error: e.message,
        })
    }
}

module.exports = {protect}