const doctorModel = require('../models/DoctorModel');

// GET ALL DOCTORS
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: 'approved' });
    res.status(200).send({
      success: true,
      message: 'Doctors List Fetched Successfully',
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error While Fetching Doctors',
    });
  }
};

module.exports = { getAllDoctorsController };
