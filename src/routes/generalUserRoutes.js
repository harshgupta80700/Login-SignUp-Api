const express =  require('express')
const router = express.Router()
const generalController = require('../controllers/generalconroller')


router.delete('/deleteAll', generalController.deleteAllUsers)

router.get('/getAllUsers', generalController.getAllUsers)


module.exports = router