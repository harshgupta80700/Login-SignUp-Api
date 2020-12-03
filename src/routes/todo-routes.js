const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo-controller');
const {check} =  require('express-validator');
const authMiddleWare = require("../middlewares/authMiddleWares");

//get user todos
router.get('/getUserTodos',authMiddleWare.checkToken,todoController.getUserTodos)


// add user todo
router.post("/addTodo",[
    check('title','Title is required').trim().not().isEmpty(),
    check('description',"Description is required").trim().not().isEmpty(),
    check('priority',"Enter a valid priority").trim().isIn(['max','min','mid'])
],authMiddleWare.checkValidators,authMiddleWare.checkToken,todoController.createUserTodo)


//delete user todo
router.delete("/deleteTodo",[
    check('id',"Id is required").trim().not().isEmpty(),
],authMiddleWare.checkValidators,authMiddleWare.checkToken,todoController.deleteUserTodo);


//update user todo
router.put("/updateTodo",[
    check('id',"Id is required").trim().not().isEmpty(),
    check('title','Title is required').trim().not().isEmpty(),
    check('description',"Description is required").trim().not().isEmpty(),
    check('priority',"Enter a valid priority").trim().isIn(['max','min','mid'])
],authMiddleWare.checkValidators,authMiddleWare.checkToken,todoController.updateUserTodo);



module.exports = router