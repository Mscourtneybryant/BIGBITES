import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';
import { ChevronDown, Bell, HelpCircle } from 'lucide-react';

const NavBar = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-hoverClr font-bold">
                    <Link to="/home">
                        Personnel Pro Employee Management System
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-white hover:text-hoverClr">Dashboard</Link>
                            <Link to="/tasks" className="text-white hover:text-hoverClr">Tasks</Link>
                            <Link to="/time-tracking" className="text-white hover:text-hoverClr">Time</Link>
                            <Link to="/leave" className="text-white hover:text-hoverClr">Leave</Link>
                            <Link to="/leave" className="text-white hover:text-hoverClr">Learning Hub</Link>
                            <Link to="/notifications" className="text-white hover:text-hoverClr">
                                <Bell size={20} />
                            </Link>
                            <Link to="/help" className="text-white hover:text-hoverClr">
                                <HelpCircle size={20} />
                            </Link>
                            <div className="relative">
                                <button
                                    onClick={toggleProfileDropdown}
                                    className="text-white hover:text-hoverClr flex items-center focus:outline-none"
                                >
                                    Profile
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                </button>
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                        <Link
                                            to="/view-profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-hoverClr"
                                        >
                                            View Profile
                                        </Link>
                                        <Link
                                            to="/edit-profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-hoverClr"
                                        >
                                            Edit Profile
                                        </Link>
                                        <Link
                                            to="/inbox"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-hoverClr"
                                        >
                                            Inbox
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <button onClick={handleLogout} className="text-white hover:text-hoverClr">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="text-white hover:text-hoverClr mr-4">Sign Up</Link>
                            <Link to="/login" className="text-white hover:text-hoverClr">Sign In</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;