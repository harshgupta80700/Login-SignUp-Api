const express =  require('express');
const router = express.Router();
const generalController = require('../controllers/general_conroller');


router.delete('/deleteAll', generalController.deleteAllUsers);

router.get('/getAllUsers', generalController.getAllUsers);

router.get('/getAllTodos',generalController.getAllTodos);

router.delete('/deleteAllTodos',generalController.deleteAllTodos);


module.exports = router;