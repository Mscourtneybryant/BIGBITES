import React, { useState, useEffect } from 'react';

export default function CheckLocalStorage() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkLocalStorage();
  }, []);

  const checkLocalStorage = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setMessage('Token found in localStorage');
    } else {
      setMessage('No token found in localStorage');
    }
  };

  const saveToken = () => {
    const newToken = 'sample-jwt-token';
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setMessage('Token saved to localStorage');
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    setToken('');
    setMessage('Token cleared from localStorage');
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4">Local Storage Check</h2>
      <p className="mb-2">{message}</p>
      {token && <p className="mb-2">Current token: {token}</p>}
      <div className="space-x-2">
        <button
          onClick={checkLocalStorage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Check localStorage
        </button>
        <button
          onClick={saveToken}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save Sample Token
        </button>
        <button
          onClick={clearToken}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Clear Token
        </button>
      </div>
    </div>
  );
}