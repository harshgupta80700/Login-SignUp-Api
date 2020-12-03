const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo_controller');
const {check} =  require('express-validator');
const authMiddleWare = require("../middlewares/auth_middleware");
const validators = require('../validators/check_validators');

//get user todos
router.get('/getUserTodos',authMiddleWare.protect,todoController.getUserTodos);


// add user todo
router.post("/addTodo",[
    check('title','Title is required').trim().not().isEmpty(),
    check('description',"Description is required").trim().not().isEmpty(),
    check('priority',"Enter a valid priority").trim().isIn(['max','min','mid'])
],validators.checkValidators,authMiddleWare.protect,todoController.createUserTodo);


//delete user todo
router.delete("/deleteTodo",[
    check('id',"Id is required").trim().not().isEmpty(),
],validators.checkValidators,authMiddleWare.protect,todoController.deleteUserTodo);


//update user todo
router.put("/updateTodo",[
    check('id',"Id is required").trim().not().isEmpty(),
    check('title','Title is required').trim().not().isEmpty(),
    check('description',"Description is required").trim().not().isEmpty(),
    check('priority',"Enter a valid priority").trim().isIn(['max','min','mid'])
],validators.checkValidators,authMiddleWare.protect,todoController.updateUserTodo);



module.exports = router;