const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo-controller');
const {check} =  require('express-validator');
const authMiddleWare = require("../middlewares/authMiddleWares");

router.get('/getUserTodos',authMiddleWare.checkToken,todoController.getUserTodos)

router.post("/addTodo",[
    check('title','Title is required').not().isEmpty(),
    check('description',"Description is required").not().isEmpty(),
    check('priority',"Enter a valid priority").isIn(['max','min','mid'])
],authMiddleWare.checkValidators,authMiddleWare.checkToken,todoController.createUserTodo)

router.delete("/deleteTodo",[
    check('id',"Id is required").not().isEmpty(),
],authMiddleWare.checkValidators,authMiddleWare.checkToken,todoController.deleteUserTodo);

router.put("/updateTodo",[
    check('id',"Id is required").not().isEmpty(),
    check('title','Title is required').not().isEmpty(),
    check('description',"Description is required").not().isEmpty(),
    check('priority',"Enter a valid priority").isIn(['max','min','mid'])
],authMiddleWare.checkValidators,authMiddleWare.checkToken,todoController.updateUserTodo);



module.exports = router