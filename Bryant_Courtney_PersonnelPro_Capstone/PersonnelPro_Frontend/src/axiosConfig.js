import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Removed '/api' from here
});

// Interceptor to add JWT token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token has expired or is invalid
            localStorage.removeItem('token');
            // Redirect to login page or refresh token
            // window.location = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;