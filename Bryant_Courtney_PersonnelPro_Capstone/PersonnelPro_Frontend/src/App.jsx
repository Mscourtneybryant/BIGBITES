import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Homepage from "./components/Homepage";
import Dashboard from "./components/Dashboard"; 
import { setCredentials } from "./redux/authSlice";

const App = () => {
    const user = useSelector((state) => state.auth.user);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token && !user) {
            
            dispatch(setCredentials({ user: { id: 1, name: 'User' }, token }));
        }
    }, [dispatch, token, user]);

    return (
        <Router>
            <NavBar isLoggedIn={!!user} /> 
            <Routes>
                <Route path="/login" element={user ? <Navigate to="/home" /> : <SignIn />} />
                <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
                <Route path="/home" element={user ? <Homepage /> : <Navigate to="/login" />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="*" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;