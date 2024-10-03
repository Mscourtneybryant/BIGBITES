import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            // Log the headers being sent
            console.log('Request headers:', axiosInstance.defaults.headers);

            const response = await axiosInstance.get('/api/employees');
            console.log('Response:', response);
            setEmployees(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching employees", error);
            
            // Log more details about the error
            if (error.response) {
                console.log('Error response:', error.response.data);
                console.log('Error status:', error.response.status);
                console.log('Error headers:', error.response.headers);
            } else if (error.request) {
                console.log('Error request:', error.request);
            } else {
                console.log('Error message:', error.message);
            }

            if (error.response && error.response.status === 403) {
                setError("You don't have permission to view this data. Please log in again.");
                // Uncomment the next line to redirect to login page
                // navigate('/login');
            } else {
                setError("An error occurred while fetching employees. Please try again later.");
            }
        }
    };

    const deleteEmployee = async (id) => {
        try {
            const response = await axiosInstance.delete(`/api/employees/${id}`);
            console.log('Delete response:', response);
            fetchEmployees(); // Refresh employee list
            setError(null);
        } catch (error) {
            console.error("Error deleting employee", error);
            
            // Log more details about the error
            if (error.response) {
                console.log('Error response:', error.response.data);
                console.log('Error status:', error.response.status);
                console.log('Error headers:', error.response.headers);
            }

            if (error.response && error.response.status === 403) {
                setError("You don't have permission to delete employees. Please log in again.");
                // Uncomment the next line to redirect to login page
                // navigate('/login');
            } else {
                setError("An error occurred while deleting the employee. Please try again later.");
            }
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div>
            <h1>Employee List</h1>
            {employees.length === 0 ? (
                <p>No employees found.</p>
            ) : (
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
            )}
        </div>
    );
};

export default EmployeeList;