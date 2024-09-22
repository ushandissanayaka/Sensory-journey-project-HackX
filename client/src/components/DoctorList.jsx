import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    
    // Destructure doctor object for easier access
    const { _id, firstName, lastName, specialization, experience, feesPerConsultation, timings, phone } = doctor;

    const handleClick = () => {
        setIsActive(true);
        navigate(`/doctor/${_id}`);
    };

    return (
        <div 
            className={`bg-white shadow-lg rounded-lg p-4 m-2 cursor-pointer transition-transform transform ${isActive ? 'bg-gray-900' : 'hover:scale-105 hover:shadow-2xl'}` } 
            onClick={handleClick} // Added navigation to doctor's details
        >
            <div className='font-semibold text-lg text-gray-800'>
                Dr. {firstName} {lastName}
            </div>
            <div className='mt-2'>
                <p className='text-gray-700'>
                    <b>Specialization</b>: {specialization}
                </p>
                <p className='text-gray-700'>
                    <b>Experience</b>: {experience} 
                </p>
                <p className='text-gray-700'>
                    <b>Contact</b>: {phone}
                </p>
                <p className='text-gray-700'>
                    <b>Fees per Consultation</b>: {feesPerConsultation}
                </p>
                <p className='text-gray-700'>
                    <b>Timing</b>: {timings && timings.length > 0 ? `${timings[0]} - ${timings[1]}` : 'N/A'}
                </p>
            </div>
        </div>
    );
};

export default DoctorList;
