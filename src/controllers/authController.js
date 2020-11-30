const User = require('../models/user')


const createUser = async (req,res,next) => {
    const user =  new User(req.body)
    console.log(user)
    try{
        if(!user){
            throw Error()
        }
        if(req.body.password !== req.body.confirmPassword){
            res.status(400).json({
                status: "Error",
                message: "Password mismatched"
            })
            return;
        }
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
        if(!user){
            res.status(404).json({
                status: "Error",
                message: "User not found"
            })
            return;
        }
        if(user.password !== req.body.password){
            res.status(400).json({
                status: "Error",
                message: "Password Incorrect"
            })
            return;
        }
        console.log(user)
    }catch(e){
        
    }

}


module.exports  = {createUser,deleteAllUsers,getAllUsers,login};