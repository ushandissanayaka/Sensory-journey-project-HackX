import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import doctor1 from '../../assets/doctor1.jpeg';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  // State for delete confirmation
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  // States for success and error messages
  const [successMessage, setSuccessMessage] = useState(null);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState(null); // New state for delete success
  const [errorMessage, setErrorMessage] = useState(null);

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
      setErrorMessage('Error fetching doctors.');
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
        setSuccessMessage(res.data.message);
        setTimeout(() => setSuccessMessage(null), 3000);
        window.location.reload();
      }
    } catch (error) {
      setErrorMessage('Something went wrong');
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  // Handle delete confirmation
  const confirmDeleteDoctor = (doctorId) => {
    setDoctorToDelete(doctorId);
    setDeleteConfirmationVisible(true);
  };

  const handleDeleteDoctor = async () => {
    if (doctorToDelete) {
      try {
        const res = await axios.delete(`http://localhost:8080/api/v1/admin/delete-doctor/${doctorToDelete}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.data.success) {
          setDeleteSuccessMessage(res.data.message); // Set the delete success message
          setTimeout(() => setDeleteSuccessMessage(null), 3000); // Clear after 3 seconds
          setDeleteConfirmationVisible(false);
          window.location.reload();
        }
      } catch (error) {
        setErrorMessage('Error occurred while deleting the doctor.');
        setTimeout(() => setErrorMessage(null), 3000);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // Get current doctors
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  return (
    <Layout>
      <div
        className="bg-cover bg-center"
        style={{ backgroundImage: `url(${doctor1})`, height: 'calc(100vh - 10vh)' }}
      >
        <h1 className="text-4xl font-bold mb-4 text-white text-center">All Doctors</h1>

        {/* Display success and error messages */}
        {successMessage && (
          <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}
        {deleteSuccessMessage && ( // Display delete success message
          <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">
            {deleteSuccessMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

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
              {currentDoctors.map((doctor) => (
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
                      <>
                        <button
                          className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 mr-2"
                          onClick={() => handleAccountStatus(doctor, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                          onClick={() => confirmDeleteDoctor(doctor._id)}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                        onClick={() => confirmDeleteDoctor(doctor._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Delete confirmation dialog */}
          {deleteConfirmationVisible && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Delete Confirmation</h2>
                <p>Are you sure you want to delete this doctor?</p>
                <div className="mt-4">
                  <button
                    className="bg-red-500 text-white py-1 px-4 rounded mr-2"
                    onClick={handleDeleteDoctor}
                  >
                    OK
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 py-1 px-4 rounded"
                    onClick={() => setDeleteConfirmationVisible(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pagination controls */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Doctors;
