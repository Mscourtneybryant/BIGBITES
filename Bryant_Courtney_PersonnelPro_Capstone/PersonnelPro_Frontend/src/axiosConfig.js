import axios from 'axios';

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
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

export default axiosInstance;
