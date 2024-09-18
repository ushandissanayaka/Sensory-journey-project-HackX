import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                navigate('/');
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
            <div className="relative w-400px" style={{ zIndex: 10 }}>
                <img
                    src="https://via.placeholder.com/400x300" // Replace with the actual image URL
                    alt="login illustration"
                    className="object-cover w-full h-full"
                    style={{ marginRight: '-10px', position: 'relative', zIndex: 10 }}
                />
            </div>

            <div
                className="relative w-700px shadow-lg rounded-2xl overflow-hidden flex"
                style={{
                    marginLeft: '-30px',
                    position: 'relative',
                    zIndex: 5,
                    height: '370px',
                    backdropFilter: 'blur(10px)', // Frosted glass effect
                    background: 'rgba(255, 255, 255, 0.15)', // Glass-like semi-transparent background
                    borderRadius: '16px',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Soft shadow
                    border: '1px solid rgba(255, 255, 255, 0.3)' // Subtle border
                }}
            >
                <div className="w-full p-8 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg">
                    <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="mb-1 text-purple-700 font-semibold">Name</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border-b-2 border-gray-300 focus:border-purple-500 outline-none bg-transparent"
                            style={{ border: 'none', borderBottom: '2px solid #ccc' }}
                        />
                      <label className="mb-1 text-purple-700 font-semibold">Email</label>
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
                            className="w-full text-white py-2 rounded-md mt-6 hover:bg-purple-700 transition-colors"
                            style={{ background: 'linear-gradient(to right, #6a0dad, #000000)' }}
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <Link to="/SignUp" className='m-2 text-purple-600 hover:underline'>
                            Not a user? Register here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
