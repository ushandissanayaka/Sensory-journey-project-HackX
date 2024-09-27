import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import usersImage from '../../assets/users.jpg'; // Ensure the image path is correct

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [selectedUserId, setSelectedUserId] = useState(null); // State to track the selected user for deletion
  const [showModal, setShowModal] = useState(false); // State to show/hide the modal
  const [message, setMessage] = useState(''); // State to hold messages

  // Get users
  const getUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
      setMessage('Failed to fetch users.');
    }
  };

  // Open modal and set selected user for deletion
  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true); // Open the modal
  };

  // Confirm account action (Deleting a user)
  const confirmDelete = async () => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/v1/admin/delete-user/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        // Update the message state
        setMessage(res.data.message);
        // Remove the deleted user from the current users list
        setUsers(users.filter((user) => user._id !== selectedUserId));
        setShowModal(false); // Close the modal
      }
    } catch (error) {
      setMessage('Something went wrong while deleting the user');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div
        className="bg-cover bg-center relative"
        style={{ backgroundImage: `url(${usersImage})`, height: 'calc(100vh - 10vh)' }} // Reduce height by 10px
      >
        <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
        <h1 className="text-4xl font-bold mb-4 text-white text-center relative">Users List</h1>
        <div className="overflow-x-auto bg-white bg-opacity-30 rounded-lg p-4 relative z-10">
          {message && (
            <div className="bg-green-500 text-white text-center p-2 mb-4 rounded">
              {message}
            </div>
          )}
          <table className="min-w-full bg-white bg-opacity-50">
            <thead>
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Doctor</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white shadow-lg bg-opacity-60 rounded-lg my-2"
                  style={{ marginBottom: '5px' }}
                >
                  <td className="py-5 px-4 text-center">{user.name}</td>
                  <td className="py-5 px-4 text-center">{user.email}</td>
                  <td className="py-5 px-4 text-center">{user.isDoctor ? 'Yes' : 'No'}</td>
                  <td className="py-5 px-4 text-center">
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                      onClick={() => handleDeleteClick(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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

      {/* Modal for delete confirmation */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                onClick={confirmDelete}
              >
                OK
              </button>
              <button
                className="bg-gray-300 py-2 px-4 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Users;
