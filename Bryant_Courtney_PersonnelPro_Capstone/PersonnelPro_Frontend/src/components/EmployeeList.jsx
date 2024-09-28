import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig'; 

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axiosInstance.get('http://localhost:8080/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees", error);
        }
    };

    const deleteEmployee = async (id) => {
        try {
            await axiosInstance.delete(`http://localhost:8080/api/employees/${id}`);
            fetchEmployees(); // Refresh employee list
        } catch (error) {
            console.error("Error deleting employee", error);
        }
    };

    return (
        <div>
            <h1>Employee List</h1>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        <p>Name: {employee.firstName} {employee.lastName}</p>
                        <p>Address: {employee.address}</p>
                        <p>DOB: {new Date(employee.dob).toLocaleDateString()}</p>
                        <p>Email: {employee.email}</p>
                        <p>Phone: {employee.phoneNumber}</p>
                        <p>Department: {employee.department}</p>
                        <p>Notes: {employee.notes}</p>
                        <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
