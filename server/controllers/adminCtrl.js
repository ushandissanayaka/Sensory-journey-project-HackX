const doctorModel =require('../models/DoctorModel')
const userModel = require('../models/userModels')

const getAllUsersController = async(req,res) => {
    try{
         const users = await userModel.find({})
         res.status(200).send({
            success:true,
            message:'users data list',
            data:users,
         });
    }catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while fetching users',
            error,
        });
    }
};

const deleteUserController = async (req, res) => {
    try {
        const userId = req.params.id; // Extract user ID from the request params
        const user = await userModel.findByIdAndDelete(userId); // Find the user by ID and delete

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'User deleted successfully',
            data: user, // Optionally send back deleted user data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting user',
            error,
        });
    }
};


const getAllDoctorsController = async(req,res) => {
    try{
            const doctors = await doctorModel.find({})
            res.status(200).send({
                success:true,
                message:'Doctors Data list',
                data: doctors,
            })
    }catch (error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting doctors data',
            error
        })
    }
};

//account status change
const changeAccountStatusController = async(req,res) => {
try {

    const {doctorId, status} = req.body
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, {status})
    const user = await userModel.findOne({_id:doctor.userId})
    const notification = user.notification
    notification.push({
        type:'doctor-account-request-update',
        message:`your Doctor Account Request Has ${status}`,
        onclickPath:'/notification'
    })
    user.isDoctor = status === 'approved' ? true : false
    await user.save()
    res.status(201).send({
        success:true,
        message:'Account Status Updated',
        data: doctor, 
    })
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in Account status', 
    })
}

}



module.exports = { getAllUsersController, getAllDoctorsController, changeAccountStatusController, deleteUserController}