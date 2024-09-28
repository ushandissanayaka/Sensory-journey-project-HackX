import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundImage from '../../assets/DoctorProfile.jpeg'; // Adjust the path as needed

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch the list of doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/Normaluser/getAllDoctors');
        if (response.data.success) {
          setDoctors(response.data.data); // Set the doctor data
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Card component for displaying doctor details
  const DoctorCard = ({ doctor }) => {
    return (
      <div 
        className="doctor-card max-w-sm rounded overflow-hidden shadow-lg p-4 bg-transparent transform transition duration-500 hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 hover:text-white"
        style={{ transition: 'background 0.5s ease' }} // Smooth background transition
      >
        <div className="px-6 py-4">
          <div className="font-bold text-2xl mb-5 text-white">{doctor.firstName} {doctor.lastName}</div>
          <p className="text-white text-base">
            Specialization: {doctor.specialization}
          </p>
          <p className="text-white text-base">
            Experience: {doctor.experience} 
          </p>
          <p className="text-white text-base">
          website: {doctor.website}
          </p>
          <p className="text-white text-base">
          experience: {doctor.experience}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Content should be placed above the overlay */}
      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-center my-8 text-white">Doctors List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
