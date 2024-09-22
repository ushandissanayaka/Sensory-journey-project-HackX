import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import doctor1 from '../../assets/doctor1.jpeg';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  // Get doctors
  const getDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle account status
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/admin/changeAccountStatus',
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        alert(res.data.message); // Tailwind doesn't have message component
        window.location.reload();
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <Layout>
      <div 
           className="bg-cover bg-center" 
           style={{ backgroundImage: `url(${doctor1})`, height: 'calc(100vh - 14vh)' }}>
        <h1 className="text-4xl font-bold mb-4 text-white text-center">All Doctors</h1>
        <div className="overflow-x-auto bg-white bg-opacity-30 rounded-lg p-4">
          <table className="min-w-full bg-white bg-opacity-50">
            <thead>
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr
                  key={doctor._id}
                  className="bg-white shadow-lg bg-opacity-60 rounded-lg my-2" 
                  style={{ marginBottom: '5px' }}  
                >
                  <td className="py-5 px-4 text-center">
                    {doctor.firstName} {doctor.lastName}
                  </td>
                  <td className="py-5 px-4 text-center">{doctor.status}</td>
                  <td className="py-5 px-4 text-center">{doctor.phone}</td>
                  <td className="py-5 px-4 text-center">
                    {doctor.status === 'pending' ? (
                      <button
                        className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                        onClick={() => handleAccountStatus(doctor, 'approved')}
                      >
                        Approve
                      </button>
                    ) : (
                      <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600">
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Doctors;