import Layout from './../../components/Layout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch users
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllUsers', {
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

  useEffect(() => {
    getUsers();
  }, []);

  // AntD table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      render: (text, record) => (
        <span>{record.isDoctor ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="flex space-x-2">
          <button className="bg-red-500 text-white px-4 py-1 rounded">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center text-2xl font-bold my-4">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;
