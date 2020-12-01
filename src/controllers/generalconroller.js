const User = require('../models/user');

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

module.exports = {deleteAllUsers,getAllUsers}