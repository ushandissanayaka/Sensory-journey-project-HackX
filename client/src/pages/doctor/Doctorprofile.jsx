import React, { useState, useRef, useEffect } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import moment from 'moment';
import doctorImage from '../../assets/Doctor.jpeg'; // Use the correct path for the image
import profileImage from '../../assets/profile.jpg'
const Profile = () => {
    const { user } = useSelector(state => state.user);
    const [doctor, setDoctor] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const formRef = useRef(null);

    useEffect(() => {
        setNotification({ message: '', type: '' });
        getDoctorInfo();
    }, []);

    const handleFinish = async (e) => {
        e.preventDefault();
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
            const res = await axios.post('http://localhost:8080/api/v1/doctor/updateProfile',
                { ...values, userId: user._id },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                setNotification({ message: 'Profile updated successfully!', type: 'success' });

                // Auto-refresh the page after 2 seconds
                setTimeout(() => {
                    window.location.reload(); // This will refresh the page
                }, 2000);
            } else {
                setNotification({ message: res.data.message || 'Error updating profile.', type: 'error' });
            }
        } catch (error) {
            dispatch(hideLoading());
            setNotification({ message: 'Something went wrong: ' + (error.response?.data?.message || error.message), type: 'error' });
        }
    };

    const getDoctorInfo = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/doctor/getDoctorInfo',
                { userId: params.id },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            if (res.data.success) setDoctor(res.data.data);
        } catch (error) { console.log(error); }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setDoctor(prev => ({ ...prev, profilePicture: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Layout>
            {notification.message && (
                <div className={`mb-1 p-1 rounded-md ${notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {notification.message}
                </div>
            )}
            <div className="relative bg-cover bg-center" style={{ backgroundImage: `url(${profileImage})` }}>
                <div className="absolute inset-0 bg-black opacity-80"></div>
                {doctor && (
                    <form onSubmit={handleFinish} ref={formRef} className="relative space-y-5 bg-white bg-opacity-20 p-8 rounded-md shadow-md" style={{ margin: '0 auto', padding: '20px', minHeight: '65vh' }}>
                        {/* Profile Picture Section */}
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <img 
                                    src={doctor.profilePicture || doctorImage } // Use actual default image URL if needed
                                    alt="Profile"
                                    className="w-60 h-60 rounded-full border-4 border-white shadow-md" 
                                />
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        <h4 className="text-xl font-semibold mb-4 text-white">Personal Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    defaultValue={doctor.firstName}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    placeholder="Your first name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    defaultValue={doctor.lastName}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    placeholder="Your last name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={doctor.email}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    placeholder="Your email"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-white">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    defaultValue={doctor.phone}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    placeholder="Your phone number"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    defaultValue={doctor.address}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    placeholder="Your address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">Website</label>
                                <input
                                    type="text"
                                    name="website"
                                    defaultValue={doctor.website}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    placeholder="Your website"
                                />
                            </div>
                        </div>

                        <h4 className="text-xl font-semibold mb-4 text-white">Professional Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white">Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    defaultValue={doctor.specialization}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    placeholder="Your specialization"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">Experience</label>
                                <input
                                    type="text"
                                    name="experience"
                                    defaultValue={doctor.experience}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    placeholder="Your experience"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">Fees per Consultation</label>
                                <input
                                    type="text"
                                    name="feesPerConsultation"
                                    defaultValue={doctor.feesPerConsultation}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    placeholder="Your consultation fees"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-white">Start Time</label>
                                <input
                                    type="time"
                                    name="startTime"
                                    defaultValue={moment(doctor.timings[0], "HH:mm").format("HH:mm")}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white">End Time</label>
                                <input
                                    type="time"
                                    name="endTime"
                                    defaultValue={moment(doctor.timings[1], "HH:mm").format("HH:mm")}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-5">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Layout>
    );
};

export default Profile;
