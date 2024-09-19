import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  // Get doctors
  const getDoctors = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllDoctors', {
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
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error('Something went wrong');
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='flex space-x-2'>
          {record.status === 'pending' ? (
            <button
              className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
              onClick={() => handleAccountStatus(record, 'approved')}
            >
              Approve
            </button>
          ) : (
            <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
              Reject
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className='text-2xl font-bold mb-4'>All Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
