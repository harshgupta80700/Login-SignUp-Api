const User = require('../models/user');
const Todos = require('../models/todo');

const getAllUsers = async(req,res,next)=>{
    try{
        const users = await User.find({});
        res.status(200).json({
            status: "Success",
            length: users.length,
            data: users
        });
    }catch(e){
        res.status(200).json({
            status: "Error",
            message: e.message
        });
    }
}


const deleteAllUsers = async(req,res,next)=>{
    try{
        await User.deleteMany({});
        res.status(200).json({
            status: "success",
            message: " Users deleted successfully"
        });
    }catch(e){
        res.status(400).json({
            message: e.message,
            status: "Error"
        });
    }
}

const getAllTodos = async(req,res,next) => {
    try{
        const todos = await Todos.find({});
        res.status(200).json({
            status: "Success",
            length: todos.length,
            data: todos
        });
    }catch(e){
        res.status(200).json({
            status: "Error",
            error: e.message
        });
    }
}

const deleteAllTodos = async(req,res,next) => {
    try{
        await Todos.deleteMany({});
        res.status(200).json({
            status: "Success",
            message: "Todos deleted"
        });
    }catch(e){
        res.status(200).json({
            status: "Error",
            error: e.message
        });
    }
}

module.exports = {deleteAllUsers,getAllUsers,getAllTodos,deleteAllTodos}