import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';

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
        '/api/v1/admin/changeAccountStatus',
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
      <h1 className="text-2xl font-bold mb-4">All Doctors</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td className="py-2 px-4 border-b">
                  {doctor.firstName} {doctor.lastName}
                </td>
                <td className="py-2 px-4 border-b">{doctor.status}</td>
                <td className="py-2 px-4 border-b">{doctor.phone}</td>
                <td className="py-2 px-4 border-b">
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
    </Layout>
  );
};

export default Doctors;
