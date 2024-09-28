import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig'; 
import { useParams } from 'react-router-dom';

const UpdateEmployee = () => {
    const { id } = useParams(); // Assuming you're passing employee id in the URL
    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        dob: '',
        email: '',
        phoneNumber: '',
        department: '',
        notes: '',
    });

    useEffect(() => {
        fetchEmployee();
    }, []);

    const fetchEmployee = async () => {
        try {
            const response = await axiosInstance.get(`http://localhost:8080/api/employees/${id}`);
            setEmployeeData(response.data);
        } catch (error) {
            console.error("Error fetching employee data", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const updateEmployee = async () => {
        try {
            await axiosInstance.put(`http://localhost:8080/api/employees/${id}`, employeeData);
            // Handle success or redirection here
        } catch (error) {
            console.error("Error updating employee", error);
        }
    };

    return (
        <div>
            <h1>Update Employee</h1>
            <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={employeeData.firstName}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={employeeData.lastName}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Address"
                name="address"
                value={employeeData.address}
                onChange={handleInputChange}
            />
            <input
                type="date"
                placeholder="Date of Birth"
                name="dob"
                value={employeeData.dob}
                onChange={handleInputChange}
            />
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={employeeData.email}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Phone Number"
                name="phoneNumber"
                value={employeeData.phoneNumber}
                onChange={handleInputChange}
            />
            <input
                type="text"
                placeholder="Department"
                name="department"
                value={employeeData.department}
                onChange={handleInputChange}
            />
            <textarea
                placeholder="Notes"
                name="notes"
                value={employeeData.notes}
                onChange={handleInputChange}
            />
            <button onClick={updateEmployee}>Update Employee</button>
        </div>
    );
};

export default UpdateEmployee;
