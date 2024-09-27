const express = require('express')
const authMiddleware = require('../midddlewares/authMiddleware');
const { getAllUsersController, getAllDoctorsController,changeAccountStatusController, deleteUserController } = require('../controllers/adminCtrl');

const router = express.Router()


//GET METHOD || USERS
router.get('/getAllUsers', authMiddleware, getAllUsersController)

// Delete user route
router.delete('/delete-user/:id', deleteUserController);

//GET METHOD || DOCTORS
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

//post account status
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController)
module.exports = router