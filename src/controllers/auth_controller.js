const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createUser = async (req,res,next) => {
    try{
        var user = await User.findOne({email: req.body.email});
        if(user !== null){
           throw Error("Email Already Exist");
        }
        user = new User(req.body);
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        };
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password,salt);
        const token = await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:process.env.JWT_EXPIRY});
        if(!token){
           throw Error("Token not generated");
        }
        await user.save();
        res.status(201).json({
            status: "Success",
            data: payload,
            token: token
        });
    }catch(e){
        res.status(400).json({
            status: "Error",
            error: e.message
        });
    }
};




const login = async(req,res,next)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(user === null){
            throw Error("User not Found");
        }
        if(!bcryptjs.compareSync(req.body.password,user.password)){
            throw Error("Password not correct");
        }
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email
        };
        const token = await jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:process.env.JWT_EXPIRY});
        if(!token){
           throw Error("Token not generated");
        }
        res.status(200).json({
            status: "Success",
            message: "Login Successful",
            token: token
        });
    }catch(e){
        console.log(e)
        res.status(200).json({
            status: "Error",
            error: e.message
        });
    }

}


const getUserObject = async(req,res,next) =>{
    try{
        const user = await User.findOne({email: req.authData.email});
        if(!user){
            throw Error("User not found");
        }
        const userTopass = {
            name: user.name,
            email: user.email
        };
        res.status(200).json({
            status: "Success",
            data: userTopass,
        });
    }catch(e){
        res.status(404).json({
            status: "Error",
            error: e.message,
        });
    }
}


module.exports = {createUser,login,getUserObject};