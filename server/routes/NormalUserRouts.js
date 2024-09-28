const express = require('express');
const { getAllDoctorsController } = require('../controllers/getAllDoctorsController');
const router = express.Router();

// GET ALL DOCTORS - PUBLIC ROUTE
router.get('/getAllDoctors', getAllDoctorsController);

module.exports = router;
