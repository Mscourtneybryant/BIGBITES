// src/components/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Homepage = () => {
    const [employees, setEmployees] = useState([]);
    const [stockData, setStockData] = useState([]);
    const stockAPIKey = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Replace with your actual API key

    useEffect(() => {
        fetchEmployees();
        fetchStockData();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/employees', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // JWT Authentication
                }
            });
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees", error);
        }
    };

    const fetchStockData = async () => {
        try {
            const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=${stockAPIKey}`);
            setStockData(response.data['Time Series (Daily)']);
        } catch (error) {
            console.error("Error fetching stock data", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8">Home Page</h1>

            {/* Employee List Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
                <ul>
                    {employees.map(employee => (
                        <li key={employee.id} className="mb-2">
                            {employee.firstName} {employee.lastName} - {employee.department}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Work Updates Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Work Updates</h2>
                <p>Here’s where you can put company-wide updates, project milestones, and work-related news.</p>
            </section>

            {/* Stocks Section */}
            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Stock Market Updates</h2>
                <ul>
                    {Object.keys(stockData).map(date => (
                        <li key={date} className="mb-2">
                            Date: {date}, Open: {stockData[date]['1. open']}, Close: {stockData[date]['4. close']}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Homepage;
