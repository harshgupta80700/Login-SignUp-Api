const Todos = require('../models/todo');

const getUserTodos = async(req,res,next) => {
    try{
        console.log("route called");
        const todos = await Todos.find({userid: req.authData.id});
        console.log(todos);
        if(!todos){
            throw Error("Todos not found");
        }
        res.status(200).json({
            status: "Success",
            length: todos.length,
            data: todos
        });
    }catch(e){
        res.status(400).json({
            status: "Error",
            error: e.message
        });
    }

}


const createUserTodo = async(req,res,next) => {
    try{
        const todo = new Todos(req.body);
        todo.userid = req.authData.id;
        await todo.save();
        res.status(201).json({
            status: "Success",
            data: todo
        });
    }catch(e){
        res.status(201).json({
            status: "Error",
            error: e.message
        });
    }
}


const deleteUserTodo = async(req,res,next) => {
    try{
        const todo = await Todos.findByIdAndDelete(req.params.id);
        if(!todo){
            throw Error("Todo not found");
        }
        res.status(201).json({
            status: "Success",
            message: "Todo deleted successfully"
        });
    }catch(e){
        res.status(201).json({
            status: "Error",
            error: e.message
        });
    }
}


const updateUserTodo = async(req,res,next) => {
    try{
        let todo = await Todos.findByIdAndUpdate(req.params.id,req.body);
        if(!todo){
            throw Error("Todo not found");
        }
        todo = await Todos.findById(req.params.id);
        res.status(201).json({
            status: "Success",
            message: "Todo Updated successfully",
            data: todo   
        });
    }catch(e){
        console.log("error catched");
        res.status(201).json({
            status: "Error",
            error: e.message
        });
    }
}


module.exports = {getUserTodos,createUserTodo,deleteUserTodo,updateUserTodo}