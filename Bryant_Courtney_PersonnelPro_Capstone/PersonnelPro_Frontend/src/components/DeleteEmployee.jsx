import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig'; 
import { useParams } from 'react-router-dom';

const DeleteEmployee = () => {
    const { id } = useParams(); // Get employee ID from URL
    const [employeeData, setEmployeeData] = useState(null);

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

    const deleteEmployee = async () => {
        try {
            await axiosInstance.delete(`http://localhost:8080/api/employees/${id}`);
            // Redirect or handle after delete
        } catch (error) {
            console.error("Error deleting employee", error);
        }
    };

    return (
        <div>
            {employeeData ? (
                <>
                    <h1>Delete Employee: {employeeData.firstName} {employeeData.lastName}</h1>
                    <p>Are you sure you want to delete this employee?</p>
                    <button onClick={deleteEmployee}>Delete</button>
                </>
            ) : (
                <p>Loading employee details...</p>
            )}
        </div>
    );
};

export default DeleteEmployee;
