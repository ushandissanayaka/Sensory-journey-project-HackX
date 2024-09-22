import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import DoctorList from '../components/DoctorList';
import Doctorlist from '../assets/Doctorlist.jpg';

const Appoinments = () => {
    const [doctors, setDoctors] = useState([]);

    // Fetch all doctors data
    const getUserData = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/user/getAllDoctors', {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            if (res.data.success) {
                setDoctors(res.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    
    return (
        <Layout>
            <div
                className="relative bg-cover bg-center"
                style={{ 
                    backgroundImage: `url(${Doctorlist})`, 
                    height: '520px'  // Set the custom height you want 
                }}
            >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Header and content positioned above the overlay */}
                <div className="relative z-10">
                    <h1 className='text-center text-4xl font-bold mb-6 text-white'>
                     Contact Your Doctor
                    </h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {doctors && doctors.map((doctor) => (
                            <DoctorList key={doctor._id} doctor={doctor} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Appoinments;
