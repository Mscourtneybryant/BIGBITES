import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/authConstants';

// Action for logging in a user
export const login = (email, password) => async (dispatch) => {
    try {
        // Make a POST request to your backend login route
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            email,
            password
        });

        // If successful dispatch the LOGIN_SUCCESS action with the received token
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data.token, 
        });

        // Store token in local storage for future authentication requests
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        // Dispatch a LOGIN_FAIL action if the request fails
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};

// Action for logging out a user
export const logout = () => (dispatch) => {
    // Remove token from local storage
    localStorage.removeItem('token');

    // Dispatch the LOGOUT action to reset the auth state
    dispatch({ type: LOGOUT });
};
