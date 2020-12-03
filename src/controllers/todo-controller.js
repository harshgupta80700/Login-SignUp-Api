const Todos = require('../models/todo');
const Users = require('../models/user');

const getUserTodos = async(req,res,next) => {

}


const createUserTodo = async(req,res,next) => {
    try{
        const todo = new Todos(req.body);
        console.log(todo);
        await todo.save();
        res.status(201).json({
            status: "Success",
            data: todo
        });
    }catch(e){
        res.status(201).json({
            status: "Error",
            error: e.message
        })
    }
}


const deleteUserTodo = async(req,res,next) => {
    try{
        const todo = await Todos.findByIdAndDelete(req.body.id)
        if(!todo){
            throw Error("Todo not found");
        }
        console.log(todo);
        res.status(201).json({
            status: "Success",
            message: "Todo deleted successfully"
        })
    }catch(e){
        res.status(201).json({
            status: "Error",
            error: e.message
        })
    }
}


const updateUserTodo = async(req,res,next) => {
    try{
        const todo = await Todos.findByIdAndUpdate(req.body.id,{
            title: req.body.title,
            description: req.body.description,
            priority : req.body.priority
        })
        if(!todo){
            throw Error("Todo not found");
        }
        console.log(todo);
        res.status(201).json({
            status: "Success",
            message: "Todo Updated successfully"
        })
    }catch(e){
        res.status(201).json({
            status: "Error",
            error: e.message
        })
    }
}


module.exports = {getUserTodos,createUserTodo,deleteUserTodo,updateUserTodo}