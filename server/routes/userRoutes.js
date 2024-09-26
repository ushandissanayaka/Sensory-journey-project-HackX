const express = require('express');
const { loginController, registerController, authController, applyDoctorController,getAllNotificationController, deleteAllNotificationController, getAllDoctorsController, bookAppointmentController, bookingAvailabilityController, userAppoinmentsController, gameController, gameRetrieveController,gameDataRetrieveController } = require('../controllers/userCtrl');
const authMiddleware = require('../midddlewares/authMiddleware');
const {articleController,guideController,resourcesProgressDataInserter} = require('../controllers/userResourcesCtrl')

// router object
const router = express.Router();

// routes
// Login || POST
router.post('/login', loginController);

// Register || POST
router.post('/register', registerController);

// Auth || POST
router.post('/getUserData', authMiddleware, authController);

// Apply Doctor || POST
router.post('/apply-doctor', authMiddleware, applyDoctorController);

// Notification Doctor || POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController);

// Notification Doctor || POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);

// GET ALL DOCTORS
router.get('/getAllDoctors', authMiddleware, getAllDoctorsController)

//BOOK APPOINTMENT
router.post('/book-appointment', authMiddleware, bookAppointmentController);

//BOOKING AVAILABILITY
router.post('/booking-availability', authMiddleware, bookingAvailabilityController)

//Appoinments List
router.get('/user-appoinments', authMiddleware, userAppoinmentsController)

//Game update
router.post('/game', gameController)

//Game Retrieve
router.get('/game', gameRetrieveController)

router.get('/resources/article',authMiddleware,articleController)
router.get('/resources/guide',authMiddleware,guideController)
router.get('/progress',authMiddleware,gameDataRetrieveController)
router.post('/resources',resourcesProgressDataInserter)
module.exports = router;
