const User = require('../models/user')
const bcryptjs = require('bcryptjs')


const createUser = async (req,res,next) => {
    var user =  await User.findOne({email: req.body.email})
    console.log(user)
    try{
        if(user){
            res.status(400).json({
                status: "Error",
                message: "Email Already Exist"
            })
            return;
        }
        user = new User(req.body)
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(user.password,salt)
        console.log("password = " + user.password);
        await user.save() 
        console.log("user created")
        res.status(201).json({
            status: "Success",
            data: user
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            status: "Error",
            data: e.message
        })
    }
};

const deleteAllUsers = async(req,res,next)=>{
    try{
        await User.deleteMany({})
        console.log("all deleted")
        res.status(200).json({
            status: "success",
            message: "Db cleared successfully"
        })
    }catch(e){
        res.status(400).json({
            message: e.message,
            status: "Error"
        })
    }
}

const getAllUsers = async(req,res,next)=>{
    try{
        const users = await User.find({})
        console.log(users);
        res.status(200).json({
            status: "Success",
            data: users
        })
    }catch(e){
        console.log(e);
        res.status(200).json({
            status: "Error",
            message: e.message
        })
    }
}

const login = async(req,res,next)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        console.log(user)
        if(!user){
            res.status(404).json({
                status: "Error",
                message: "User not found"
            })
            return;
        }
        if(!bcryptjs.compareSync(req.body.password,user.password)){
            res.status(400).json({
                status: "Error",
                message: "Password Incorrect"
            })
            return;
        }
        res.status(200).json({
            status: "Success",
            data: user,
            message: "Login Successful"
        })
    }catch(e){
        console.log(e)
        res.status(200).json({
            status: "Error",
            message: "Login Unsuccessful"
        })
    }

}


module.exports  = {createUser,deleteAllUsers,getAllUsers,login};