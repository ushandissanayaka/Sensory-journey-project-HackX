const express = require('express');
const authMiddleware = require('../midddlewares/authMiddleware');
const {doctorAppoinmentController, updateStatusController } = require('../controllers/doctorCtrl');
const { getDoctorInfoController, updateProfileController, getDoctorByIdController } = require('../controllers/doctorCtrl');
const router = express.Router();

//POST SINGLE DOC INFO
router.post('/getDoctorInfo', authMiddleware, getDoctorInfoController);

//POST UPDATE PROFILE
router.post('/updateProfile', authMiddleware, updateProfileController);

//POST GET SINGLE DOC INFO
router.post('/getDoctorById', authMiddleware, getDoctorByIdController);

//Get appoinments
router.get('/doctor-appoinments', authMiddleware, doctorAppoinmentController)

//POST update ststus
router.post('/update-status', authMiddleware, updateStatusController)

module.exports = router;