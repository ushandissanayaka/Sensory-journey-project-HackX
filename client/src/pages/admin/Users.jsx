import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import usersImage from '../../assets/users.jpg'; // Ensure the image path is correct

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

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
    }
  };

  // Handle account actions (Deleting a user)
  const handleAccountAction = async (userId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/v1/admin/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        alert(res.data.message);
        // Remove the deleted user from the current users list
        setUsers(users.filter((user) => user._id !== userId));
      }
    } catch (error) {
      alert('Something went wrong while deleting the user');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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
                      onClick={() => handleAccountAction(user._id)}
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
    </Layout>
  );
};

export default Users;
