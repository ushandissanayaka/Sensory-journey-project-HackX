import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
// Import the image from the assets folder
import signupImage from '../assets/signupImage.jpeg';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { login } = useAuth(); // Get the login function from AuthContext
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = formData;

        try {
            dispatch(showLoading());
            const res = await axios.post('http://localhost:8080/api/v1/user/login', {
                email,
                password
            });
            dispatch(hideLoading());

            if (res.data.success) {
                localStorage.setItem('token', res.data.token);
                alert('Login Successfully');
                
                // Call login function to update authentication state
                login({ email });

                navigate('/PublicDashboard');
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
            {/* Image */}
            <div className="relative w-[400px]" style={{ zIndex: 10, marginRight: '-0.4px' }}>
                    <img
                        src={signupImage} 
                        alt="signup illustration"
                        className="object-cover w-full h-full rounded-3xl "
                    />
                </div>

            <div
                className="relative w-700px shadow-lg rounded-2xl overflow-hidden flex"
                style={{
                    marginLeft: '-30px',
                    position: 'relative',
                    zIndex: 5,
                    height: '370px',
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '16px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
            >
                <div className="w-full p-8 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="mb-1 text-purple-700 font-semibold">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-500 outline-none bg-transparent"
                            style={{ border: 'none', borderBottom: '2px solid #ccc' }}
                        />
                        <label className="mb-1 text-purple-700 font-semibold">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-500 outline-none bg-transparent"
                            style={{ border: 'none', borderBottom: '2px solid #ccc' }}
                        />
                        <button
                            type="submit"
                            className="w-full py-2 px-4 mt-4 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors duration-300"
                            style={{ background: 'linear-gradient(to right,#6a0dad, #000000)' }}
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-sm">
                            Don't have an account?{' '}
                            <Link
                                to="/Signup"
                                className="text-purple-600 font-semibold hover:text-purple-800"
                                
                            >
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
