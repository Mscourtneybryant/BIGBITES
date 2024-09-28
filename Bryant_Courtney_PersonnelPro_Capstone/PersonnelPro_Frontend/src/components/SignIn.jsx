import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email,
                password
            });

            const { token } = response.data;
            localStorage.setItem('token', token); // Save token to localStorage
            navigate('/homepage'); // Redirect to homepage after successful login
        } catch (error) {
            console.error("Error logging in", error);
            alert('Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-6 text-center">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
