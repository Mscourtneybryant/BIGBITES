import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions'

const NavBar = () => {
    const user = useSelector(state => state.auth.user); 
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between">
                <div className="text-white font-bold">
                    <Link to="/home">Employee Management System</Link>
                </div>
                <div className="flex items-center">
                    {user ? (
                        <>
                            <span className="text-white mr-4">Welcome, {user.firstName}</span>
                            <button onClick={handleLogout} className="text-white">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="text-white mr-4">Sign Up</Link>
                            <Link to="/login" className="text-white">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
