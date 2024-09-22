import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import usersImage from '../../assets/users.jpeg'; // Ensure the image path is correct

const Users = () => {
  const [users, setUsers] = useState([]);

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

  // Handle account actions (e.g., blocking)
  const handleAccountAction = async (userId) => {
    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/admin/blockUser',
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout>
      <div
        className="bg-cover bg-center relative"
        style={{ backgroundImage: `url(${usersImage})`, height: 'calc(100vh - 14vh)' }} // Reduce height by 10px
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
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
              {users.map((user) => (
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
                      Block
                    </button>
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

export default Users;