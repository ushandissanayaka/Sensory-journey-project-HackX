import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctor }) => {
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false); // State to track if the card is clicked

    // Destructure doctor object for easier access
    const { _id, firstName, lastName, specialization, experience, feesPerConsultation, timings, phone } = doctor;

    const handleClick = () => {
        setIsClicked(true);  // Set the card to clicked state
        navigate(`/doctor/${_id}`);
    };

    return (
        <div 
            className={`relative shadow-lg rounded-lg p-4 m-2 cursor-pointer overflow-hidden transition-transform transform 
                        ${isClicked ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-red-500' : 'hover:bg-gradient-to-r hover:from-pink hover:via-purple-600 hover:to-blue-100'} 
                        hover:scale-105 hover:shadow-2xl`} 
           
        >
            {/* Content section */}
            <div className='relative z-10'>
                <div className='font-semibold text-lg text-white'>
                    Dr. {firstName} {lastName}
                </div>
                <div className='mt-2'>
                    <p className='text-white'>
                        <b>Specialization</b>: {specialization}
                    </p>
                    <p className='text-white'>
                        <b>Experience</b>: {experience} 
                    </p>
                    <p className='text-white'>
                        <b>Contact</b>: {phone}
                    </p>
                    <p className='text-white'>
                        <b>Fees per Consultation</b>: {feesPerConsultation}
                    </p>
                    <p className='text-white'>
                        <b>Timing</b>: {timings && timings.length > 0 ? `${timings[0]} - ${timings[1]}` : 'N/A'}
                    </p>
                </div>
            </div>

            {/* Gradient background for hover effect */}
            {!isClicked && (
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            )}
        </div>
    );
};

export default DoctorList;
