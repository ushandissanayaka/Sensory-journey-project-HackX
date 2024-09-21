import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout'; // Adjust path as necessary
import moment from 'moment';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const getAppointments = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Ensure userId is available
                const res = await axios.get('/api/v1/user/user-appoinments', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    params: {
                        userId: userId // Pass userId as a query parameter
                    }
                });

                if (res.data.success) {
                    setAppointments(res.data.data);
                } else {
                    console.error('Failed to fetch appointments:', res.data.message);
                    // Handle error message display using state or other mechanisms
                }
            } catch (error) {
                console.error('Error fetching appointments:', error.response || error.message);
                // Handle error message display using state or other mechanisms
            }
        };

        getAppointments();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const columns = [
        {
            key: '1',
            title: 'ID',
            dataIndex: '_id',
        },
        {
            key: '2',
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.doctorId.firstName} {record.doctorId.lastName}
                </span>
            ),
        },
        {
            key: '3',
            title: 'Phone',
            dataIndex: 'phone',
            render: (text, record) => (
                <span>
                    {record.doctorId.phone}
                </span>
            ),
        },
        {
            key: '4',
            title: 'Date & Time',
            dataIndex: 'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format('DD-MM-YYYY')} &nbsp;
                    {moment(record.time).format('HH:mm')}
                </span>
            ),
        },
        {
            key: '5',
            title: 'Status',
            dataIndex: 'status',
        },
    ];

    return (
        <div>
            <Layout>
                <h1 className="text-2xl font-bold mb-4">Appointment Lists</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {column.title}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.map((appointment) => (
                                <tr key={appointment._id} className="hover:bg-gray-50">
                                    {columns.map((column) => (
                                        <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                                            {column.render
                                                ? column.render(appointment[column.dataIndex], appointment)
                                                : appointment[column.dataIndex]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Layout>
        </div>
    );
};

export default Appointments;
