import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const { isLoggedIn, setIsLoggedIn, isDarkMode } = useAuth(); // Destructure isDarkMode from useAuth
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3000/login', {
                email,
                password
            });
            
            setEmail('');
            setPassword('');
            setLoginError('');

            console.log(response.data)

            
            
            if (response.data.accessToken) {
                console.log('Login successful:', response.data);
                const { accessToken } = response.data.accessToken;
                const { email } = response.data.accessToken.user;
                const { _id } = response.data.accessToken.user;
                console.log(_id);
                console.log(accessToken);
                console.log(email);
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("_id", _id);
                localStorage.setItem("email", email);
                setIsLoggedIn(true);
                
                navigate('/');
            } else {
                setLoginError("Login failed. Invalid email or password");
                console.log("Login failed. Invalid email or password");
            }
            
        } catch (error) {
            setLoginError('Login failed. Invalid email or password');
            console.log(error);
        }
    };


    return (
        <div className={`w-1/2 mx-auto p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-500"} rounded-lg shadow-md`}>
            <h2 className="text-2xl font-semibold mb-4">Login Form</h2>
            {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
            <form onSubmit={handleSubmit}>
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
                    className={`w-full ${isDarkMode ? "bg-gray-700" : "bg-gray-400"} text-white py-2 rounded-lg hover:bg-blue-400 transition duration-300`}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
