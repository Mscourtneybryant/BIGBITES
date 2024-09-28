import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignIn from './components/SignIn'; 
import HomePage from './components/Homepage'; 
import NavBar from './components/NavBar'; 
import SignUp from './components/SignUp'; 
import { useSelector } from 'react-redux'; 

const App = () => {
    const user = useSelector(state => state.auth.user); 
    
    return (
        <Router>
            {/* Navbar will always be visible */}
            <NavBar />
            
            <Switch>
                {/* Route for Login Page */}
                <Route path="/login">
                    {/* If user is logged in, redirect to homepage */}
                    {user ? <Redirect to="/home" /> : <SignIn />}
                </Route>

                {/* Route for Sign Up Page */}
                <Route path="/signup">
                    {user ? <Redirect to="/home" /> : <SignUp />}
                </Route>

                {/* Route for HomePage - Only accessible after login */}
                <Route path="/home">
                    {user ? <HomePage /> : <Redirect to="/login" />}
                </Route>

                {/* Default Route */}
                <Route exact path="/">
                    {user ? <Redirect to="/home" /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </Router>
    );
};

export default App;

