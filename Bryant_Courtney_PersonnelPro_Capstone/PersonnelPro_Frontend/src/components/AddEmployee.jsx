import React, { useState } from 'react';
import axiosInstance from '../axiosConfig'; 

const AddEmployee = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [department, setDepartment] = useState('');
    const [notes, setNotes] = useState('');

    const addEmployee = async () => {
        try {
            await axiosInstance.post('http://localhost:8080/api/employees', {
                firstName,
                lastName,
                address,
                dob,
                email,
                phoneNumber,
                department,
                notes
            });

            // Clear the input fields after successful submission
            setFirstName('');
            setLastName('');
            setAddress('');
            setDob('');
            setEmail('');
            setPhoneNumber('');
            setDepartment('');
            setNotes('');
        } catch (error) {
            console.error("Error adding employee", error);
        }
    };

    return (
        <div>
            <h1>Add Employee</h1>
            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            />
            <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <button onClick={addEmployee}>Add Employee</button>
        </div>
    );
};

export default AddEmployee;
