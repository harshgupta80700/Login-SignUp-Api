const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createUser = async (req,res,next) => {
    var user = new User(req.body);
    console.log(user)
    try{
        const userTopass = new User({
            name: user.name,
            email: user.email
        })
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(user.password,salt)
        const token = await jwt.sign(userTopass.toJSON(),process.env.SECRET_KEY,{expiresIn:"1h"});
        if(!token){
           throw Error("Token not generated");
        }
        await user.save()
        res.status(201).json({
            status: "Success",
            data: userTopass,
            token: token
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            status: "Error",
            data: e.message
        })
    }
};




const login = async(req,res,next)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        if(!bcryptjs.compareSync(req.body.password,user.password)){
            res.status(400).json({
                status: "Error",
                message: "Password Incorrect"
            })
            return;
        }
        const userTopass = new User({
            name: user.name,
            email: user.email
        })
        const token = await jwt.sign(userTopass.toJSON(),process.env.SECRET_KEY,{expiresIn:"1h"});
        if(!token){
           throw Error("Token not generated");
        }
        res.status(200).json({
            status: "Success",
            data: userTopass,
            message: "Login Successful",
            token: token
        })
    }catch(e){
        console.log(e)
        res.status(200).json({
            status: "Error",
            message: "Login Unsuccessful"
        })
    }

}


const getUserObject = async(req,res,next) =>{
    try{
        const user = await User.findOne({email: req.authData.email})
        console.log(user);
        if(!user){
            throw Error("User not found")
        }
        const userTopass = new User({
            name: user.name,
            email: user.email
        })
        res.status(200).json({
            status: "Success",
            message: userTopass,
        })
        return;
    }catch(e){
        res.status(404).json({
            status: "Error",
            message: e.message,
        })
        return;
    }
}


module.exports  = {createUser,login,getUserObject};