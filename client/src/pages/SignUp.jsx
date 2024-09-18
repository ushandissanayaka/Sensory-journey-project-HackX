import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = formData;

        try {
            dispatch(showLoading());
            const res = await axios.post('http://localhost:8080/api/v1/user/register', {
                name,
                email,
                password
            });
            dispatch(hideLoading());
            if (res.data.success) {
                alert('Registered successfully!');
                navigate('/login');
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error(error);
            alert('Something went wrong');
        }
    };

    return (
        <div
            className="flex items-center justify-center h-screen relative"
            style={{ background: 'linear-gradient(to right, #F6A4E9, #6a0dad, #000000)' }}
        >
            <div className="flex items-center justify-center relative" style={{ marginTop: '100px' }}>
                {/* Image */}
                <div className="relative w-[400px]" style={{ zIndex: 10, marginRight: '-15px' }}>
                    <img
                        src="https://via.placeholder.com/400x300" // Replace with the actual image URL
                        alt="signup illustration"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Sign-up details */}
                <div className="relative w-[480px] bg-white shadow-lg rounded-2xl overflow-hidden flex"
                    style={{
                        position: 'relative',
                        zIndex: 5,
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.01)', // Glass effect background
                        borderRadius: '20px',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Soft shadow
                        border: '1px solid rgba(255, 255, 255, 0.3)' // Light border
                    }}>
                    <div className="w-full p-8 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg">
                        <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">Sign Up</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col">
                                <label className="mb-1 text-purple-700 font-semibold">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-500 outline-none bg-transparent"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 text-purple-700 font-semibold">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-500 outline-none bg-transparent"
                                    required
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 text-purple-700 font-semibold">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-500 outline-none bg-transparent"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white py-2 rounded-md mt-6 hover:bg-purple-700 transition-colors"
                                style={{ background: 'linear-gradient(to right,#6a0dad, #000000)' }}
                            >
                                Sign Up
                            </button>
                        </form>

                        {/* Link to login */}
                        <div className="text-center mt-4">
                            <Link to="/login" className="text-purple-600 hover:underline">
                                Already a user? Login here
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
