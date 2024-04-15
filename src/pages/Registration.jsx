import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Registration = () => {
    const [userName, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const navigate = useNavigate();
    const { isDarkMode } = useAuth(); // Destructure isDarkMode from useAuth

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userName || !email || !password) {
            setRegistrationError('All fields are required');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:3000/register', {
                userName,
                email,
                password
            });
            
            setUsername('');
            setEmail('');
            setPassword('');
            setRegistrationError('');
            
            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            setRegistrationError('Registration failed. Please try again.');
            console.error('Registration error:', error);
        }
    };

    return (
        <div className={`w-1/2 mx-auto p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-500 text-gray-700"} rounded-lg shadow-md`}>
            <h2 className="text-2xl font-semibold mb-4">Registration Form</h2>
            {registrationError && <p className="text-red-500 mb-4">{registrationError}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className={`w-full ${isDarkMode ? "bg-gray-700" : "bg-gray-300"} text-white py-2 rounded-lg hover:bg-blue-500 transition duration-300`}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Registration;
