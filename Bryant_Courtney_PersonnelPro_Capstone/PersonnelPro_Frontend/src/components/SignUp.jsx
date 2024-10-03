import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import orngBackground from '../photos/orng.gif';
import Footer from '../components/Footer';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/signup', {
                firstName,
                lastName,
                email,
                password,
                department,
                address,
                dob,
                phoneNumber,
                notes
            });
            navigate('/login'); // Redirect to login after successful signup
        } catch (error) {
            console.error('Error during signup', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex justify-center items-center bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${orngBackground})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded w-96">
                    <h2 className="text-2xl mb-4 font-bold text-center">Sign Up</h2>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full mb-4 p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full mb-4 p-2 border rounded"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full mb-4 p-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full mb-4 p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="block w-full mb-4 p-2 border rounded"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="block w-full mb-4 p-2 border rounded"
                    />
                    <input
                        type="date"
                        placeholder="Date of Birth"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="block w-full mb-4 p-2 border rounded"
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="block w-full mb-4 p-2 border rounded"
                    />
                    <textarea
                        placeholder="Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="block w-full mb-4 p-2 border rounded"
                    />
                    <button type="submit" className="w-full h-10 rounded-md bg-primary hover:bg-hoverClr">
                        Sign Up
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default SignUp;