import React, { useState, useRef, useEffect } from 'react';
import Layout from './../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import doctorImage from '../assets/Doctor.jpeg'; // Import the image with the correct name

const ApplyDoctor = () => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formRef = useRef(null);

    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        setNotification({ message: '', type: '' });
    }, []);

    const handleFinish = async (event) => {
        event.preventDefault();
        const form = formRef.current;

        const values = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            email: form.email.value,
            phone: form.phone.value,
            address: form.address.value,
            website: form.website.value,
            specialization: form.specialization.value,
            experience: form.experience.value,
            feesPerConsultation: form.feesPerConsultation.value,
            timings: [
                moment(form.startTime.value, "HH:mm").format("HH:mm"),
                moment(form.endTime.value, "HH:mm").format("HH:mm"),
            ],
        };

        try {
            dispatch(showLoading());
            const res = await axios.post('http://localhost:8080/api/v1/user/apply-doctor', {
                ...values,
                userId: user._id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            dispatch(hideLoading());

            if (res.data.success) {
                setNotification({ message: 'Application submitted successfully!', type: 'success' });
                form.reset();
                
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                setNotification({ message: res.data.message || 'Error submitting application.', type: 'error' });
            }
        } catch (error) {
            dispatch(hideLoading());
            setNotification({ message: 'Something went wrong: ' + (error.response?.data?.message || error.message), type: 'error' });
            console.error('Error:', error);
        }
    };

    return (
        <Layout>
            {notification.message && (
                <div className={`mb-1 p-1 rounded-md ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {notification.message}
                </div>
            )}
            <div 
                className="relative bg-cover bg-center" 
                style={{ backgroundImage: `url(${doctorImage})`, minHeight: '65vh rounded-md' }} // Reduced the image height
            >
                <div className="absolute inset-0 bg-black opacity-70 "></div> {/* Background darkness */}
                <form 
                    onSubmit={handleFinish} 
                    className="relative space-y-5 bg-white bg-opacity-20 p-8 rounded-md shadow-md rounded-md " 
                    style={{ margin: '0 auto', padding: '20px', minHeight: '65vh' }} // Reduced form height and width
                    ref={formRef}
                >
                    <div>
                        <h4 className="text-xl font-semibold mb-4 text-white">Doctor Personal Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white">First Name</label>
                                <input type="text" name="firstName" placeholder="Your first name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">Last Name</label>
                                <input type="text" name="lastName" placeholder="Your last name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">Email</label>
                                <input type="email" name="email" placeholder="Your email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-white">Phone Number</label>
                            <input type="text" name="phone" placeholder="Your phone number" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">Address</label>
                            <input type="text" name="address" placeholder="Your address" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-white">Website</label>
                            <input type="text" name="website" placeholder="Your website" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl font-semibold mb-4 text-white">Doctor Professional Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-white">Specialization</label>
                                <input type="text" name="specialization" placeholder="Your specialization" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">Experience</label>
                                <input type="text" name="experience" placeholder="Your experience" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">Fees per Consultation</label>
                                <input type="number" name="feesPerConsultation" placeholder="Your fee per consultation" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-white">Start Time</label>
                            <input type="time" name="startTime" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                        </div>
                        <div> 
                            <label className="block text-sm font-medium text-white">End Time</label>
                            <input type="time" name="endTime" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="px-8 py-2 bg-blue-600 text-white rounded-md">Submit</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ApplyDoctor;
